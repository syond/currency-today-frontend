export function BaseButton({ onClick, type, children }) {
  return (
    <button className="p-2 bg-green rounded-md" onClick={onClick} type={type}>
      {children}
    </button>
  );
}
