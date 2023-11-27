import { useContext, useEffect, useState } from "react";
import { ConfigModalFormContext } from "@/Contexts";
import moment from "moment";
import Image from "next/image";

import { useApi } from "@/hooks/useApi";

function formatToDateTime(value) {
  return moment(value).format("DD/MM/YYYY - hh:mm:ss");
}

function formatCurrency(value, code) {
  return value.toLocaleString(undefined, {
    style: "currency",
    currency: code,
  });
}

const flagObjects = [
  { src: "/UE.png", currency_symbol: "EUR" },
  { src: "/UK.png", currency_symbol: "GBP" },
  { src: "/USA.png", currency_symbol: "USD" },
  // { src: '/CAD.png', currency_symbol: 'CAD' },
];

export default function Home() {
  const configFormCtx = useContext(ConfigModalFormContext)

  const [flag, setFlag] = useState("USD");
  const [currencyPrice, setCurrencyPrice] = useState(null);
  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [intervalID, setIntervalID] = useState(null);

  function handleClickFlag(currencySymbol) {
    setFlag(() => currencySymbol);
  }

  function loadCurrencyPrice() {
    if (
      response.currencies_exchange &&
      response.currencies_exchange.length > 0
    ) {
      const currencyExchange = response.currencies_exchange.find(
        (value) => value.currency_code === flag
      );
      const formattedResult = formatCurrency(currencyExchange.price, "BRL");
      setCurrencyPrice(formattedResult);
    }
  }

  const requestGetCurrenciesExchange = async () => {
    setIsLoading(true);

    try {
      const result = await useApi("currency", "/BRL");

      setResponse(result);
    } catch (e) {
      throw new Error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    requestGetCurrenciesExchange();
  }, []);

  useEffect(() => {
    loadCurrencyPrice();
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

  /**
   * Component
   * @returns
   */
  const FlagList = () => {
    return flagObjects.map((image) => (
      <div
        key={image.currency_symbol}
        className={`
          rounded-md border border-purple ring-4 hover:brightness-100 transition delay-50 cursor-pointer
          scale-100 md:hover:scale-125
          ${flag === image.currency_symbol ? "brightness-100" : "brightness-50"}
        `}
        onClick={() => handleClickFlag(image.currency_symbol)}
      >
        <Image
          src={image.src}
          alt={image.currency_symbol}
          width="80"
          height="80"
        />
      </div>
    ));
  };

  /**
   * Generic Component
   * @param {*} props
   * @returns
   */
  const SkeletonLoading = (props) => {
    return (
      <div className={`animate-pulse ${props.className}`}>
        {/* <div className={`flex ${props.column ? 'flex-col' : ''} space-y-2 justify-center items-center`}>
        </div> */}
        {props.children}
      </div>
    );
  };

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
                {flag ? formatCurrency(1, flag) : null}
              </span>
              <span className="text-2xl text-neutral font-medium pl-3">=</span>
              <span className="text-4xl text-neutral font-bold pl-3">
                {currencyPrice}
              </span>
            </div>
            <small className="text-gray-light" suppressHydrationWarning>
              Last update: {formatToDateTime(response.updatedAt)}
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
          <FlagList />
        )}
      </section>
    </div>
  );
}
