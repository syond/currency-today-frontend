import { useContext, useEffect, useState, useRef } from "react";
import {
  ConfigModalFormContext,
  ToasterContext,
  UtilsContext,
} from "@/Contexts";

import Image from "next/image";

import { useApi } from "@/hooks/useApi";
import { usePrevious } from "@/hooks/usePrevious";
import { ApiException } from "@/exceptions/ApiException";

import { SkeletonLoading } from "@/components/SkeletonLoading";
import { FlagList } from "@/components/list/FlagList";

const flagObjects = [
  { src: "/UE.png", currency_symbol: "EUR" },
  { src: "/UK.png", currency_symbol: "GBP" },
  { src: "/USA.png", currency_symbol: "USD" },
  // { src: '/CAD.png', currency_symbol: 'CAD' },
];

export default function Home() {
  const utilsCtx = useContext(UtilsContext);
  const toasterCtx = useContext(ToasterContext);
  const configFormCtx = useContext(ConfigModalFormContext);

  const [flag, setFlag] = useState("USD");
  const [currencyPriceFormatted, setCurrencyPriceFormatted] = useState(null);
  const [currencyPrice, setCurrencyPrice] = useState(0);
  const [oldCurrencyPrice, setOldCurrencyPrice] = useState(0);
  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [intervalID, setIntervalID] = useState(null);

  const previousResponse = usePrevious(response);

  const audioElementPriceLowerThan = useRef(null);
  const audioElementPriceChange = useRef(null);

  function handleClickFlag(currencySymbol) {
    setFlag(() => currencySymbol);
  }

  function loadCurrencyPriceByFlag() {
    if (
      response.currencies_exchange &&
      response.currencies_exchange.length > 0
    ) {
      const currencyExchange = response.currencies_exchange.find(
        (value) => value.currency_code === flag
      );

      setCurrencyPrice((oldValue) => {
        setOldCurrencyPrice(oldValue);

        return +currencyExchange.price.toFixed(2);
      });

      const formattedResult = utilsCtx.FormatValue.currency(
        currencyExchange.price,
        "BRL"
      );
      setCurrencyPriceFormatted(formattedResult);
    }
  }

  const requestGetCurrenciesExchange = async () => {
    setIsLoading(true);

    try {
      const result = await useApi("currency", "/BRL");

      /**
       * @mock
       * Remove this code after use it
       */
      // const result = await fetch("/api/currency/BRL")
      //   .then((res) => res.json())
      //   .catch((e) => {
      //     throw new Error(e);
      //   });

      setResponse(result);
    } catch (e) {
      throw new ApiException();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    requestGetCurrenciesExchange();
  }, []);

  useEffect(() => {
    loadCurrencyPriceByFlag();
  }, [response, flag]);

  useEffect(() => {
    if (configFormCtx.timeUpdateInterval === 0) {
      clearInterval(intervalID);
      setIntervalID(null);
    }

    if (configFormCtx.timeUpdateInterval > 0) {
      setIntervalID(
        setInterval(() => {
          requestGetCurrenciesExchange();
        }, configFormCtx.timeUpdateInterval)
      );
    }
  }, [configFormCtx.timeUpdateInterval]);

  function handlePlayAudioPriceLowerThan() {
    audioElementPriceLowerThan.current.play();

    // Reset after audio was played to not play it again
    configFormCtx.referencePrice = 0;
  }

  function handlePlayAudioWhenPriceChange() {
    audioElementPriceChange.current.play();

    toasterCtx.openToaster("New price!!!", "The currency price has changed.");
  }

  return (
    <div className="container max-w-full max-h-screen">
      <section className="flex flex-col items-center mb-6">
        <div className="mb-2">
          <Image
            src="/currency-exchange.svg"
            alt="logo"
            width="90"
            height="90"
          />
        </div>

        {isLoading ? (
          <SkeletonLoading>
            <div className="flex flex-col space-y-2 justify-center items-center">
              <div className="h-5 w-80 bg-slate-700 rounded"></div>
              <div className="h-3 w-52 bg-slate-700 rounded"></div>
            </div>
          </SkeletonLoading>
        ) : (
          <>
            <div className="mb-2">
              <span
                className="text-4xl text-neutral font-bold"
                suppressHydrationWarning
              >
                {flag && utilsCtx.FormatValue.currency(1, flag)}
              </span>
              <span className="text-2xl text-neutral font-medium pl-3">=</span>
              <span className="text-4xl text-neutral font-bold pl-3">
                {currencyPriceFormatted}
              </span>
            </div>
            <small className="text-gray-light" suppressHydrationWarning>
              Last update: {utilsCtx.FormatValue.toDateTime(response.updatedAt)}
            </small>
          </>
        )}
      </section>

      <section className="flex justify-center items-center space-x-5">
        {isLoading ? (
          <SkeletonLoading>
            <div className="flex space-x-5 justify-center items-center">
              <div className="h-20 w-20 bg-slate-700 rounded"></div>
              <div className="h-20 w-20 bg-slate-700 rounded"></div>
              <div className="h-20 w-20 bg-slate-700 rounded"></div>
            </div>
          </SkeletonLoading>
        ) : (
          <FlagList
            flagObjects={flagObjects}
            currentFlag={flag}
            handleClickFlag={handleClickFlag}
          />
        )}
      </section>

      <audio ref={audioElementPriceLowerThan}>
        <source src="sound-notification.mp3" type="audio/mp3"></source>
      </audio>

      {configFormCtx.referencePrice &&
        currencyPrice <
          +parseFloat(configFormCtx.referencePrice.trim()).toFixed(2) &&
        handlePlayAudioPriceLowerThan()}

      <audio ref={audioElementPriceChange}>
        <source src="notification-price-change.mp3" type="audio/mp3"></source>
      </audio>

      {previousResponse !== response &&
        oldCurrencyPrice !== currencyPrice &&
        handlePlayAudioWhenPriceChange()}
    </div>
  );
}
