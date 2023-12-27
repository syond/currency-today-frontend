export function BaseButton({ className, onClick, type, children }) {
  return (
    <button className={`p-2 bg-green rounded-md ${className}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
