import { useEffect, useState, useCallback } from "react";
import moment from "moment";

import Image from "next/image";

const fetcher = (resource) => fetch(`${process.env.NEXT_PUBLIC_API_URL}${resource}`).then((res) => res.json());

export default function Home() {
  const [flag, setFlag] = useState("USD");
  const [currencyPrice, setCurrencyPrice] = useState(0);
  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  function handleClickFlag(e) {
    const value = e.target.attributes.alt.value;

    console.log('antes >>>', flag)

    setFlag(value);

    console.log('depois >>>', flag)

    getCurrency(value);
  }

  function getCurrency() {
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

  function formatCurrency(value, code) {
    return value.toLocaleString(undefined, {
      style: "currency",
      currency: code,
    });
  }

  function formatToDateTime(value) {
    return moment(value).format("DD/MM/YYYY - hh:mm:ss");
  }

  // const getCurrenciesExchange = useCallback(async () => {
  //   setIsLoading(true);

  //   try {
  //     const result = await fetcher('/currency/BRL');

  //     setResponse(result);
  //     getCurrency();
  //   } catch (e) {
  //     throw new Error(e);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, []);

  const getCurrenciesExchange = async () => {
    setIsLoading(true);

    try {
      const result = await fetcher('/currency/BRL');

      setResponse(result);
      getCurrency();
    } catch (e) {
      throw new Error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCurrenciesExchange();
  }, []);

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
          <p>Loading...</p>
        ) : (
          <>
            <div className="mb-2">
              <span
                className="text-4xl text-neutral font-bold"
                suppressHydrationWarning
              >
                {formatCurrency(1, flag)}
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
        <div
          className={`
            rounded-md border border-purple ring-4 hover:brightness-100 transition delay-50 cursor-pointer
            ${flag === "EUR" ? "brightness-100" : "brightness-50"}
          `}
        >
          <Image
            src="/UE.png"
            alt="EUR"
            width="90"
            height="90"
            onClick={handleClickFlag}
          />
        </div>
        <div
          className={`
            rounded-md border border-purple ring-4 hover:brightness-100 transition delay-50 cursor-pointer
            ${flag === "GBP" ? "brightness-100" : "brightness-50"}
          `}
        >
          <Image
            src="/UK.png"
            alt="GBP"
            width="90"
            height="90"
            onClick={handleClickFlag}
          />
        </div>
        <div
          className={`
            rounded-md border border-purple ring-4 hover:brightness-100 transition delay-50 cursor-pointer
            ${flag === "USD" ? "brightness-100" : "brightness-50"}
          `}
        >
          <Image
            src="/USA.png"
            alt="USD"
            width="90"
            height="90"
            onClick={handleClickFlag}
          />
        </div>
      </section>
    </div>
  );
}
