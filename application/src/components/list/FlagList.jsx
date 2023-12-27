import Image from "next/image";

/**
 * @todo
 * This has specifics implementation and I don't know where to put
 * this component yet. This needs to go to another place or refactored
 * to be a generic component.
 * @param {Array<{}>} flagObjects
 * @param {String} flag
 * @param {Function} handleClickFlag
 * @returns
 */
export function FlagList({ flagObjects, flag, handleClickFlag }) {
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
}
