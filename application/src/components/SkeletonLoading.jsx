export function SkeletonLoading(props) {
  return (
    <div className={`animate-pulse ${props.className}`}>
      {/* <div className={`flex ${props.column ? 'flex-col' : ''} space-y-2 justify-center items-center`}>
        </div> */}
      {props.children}
    </div>
  );
};
