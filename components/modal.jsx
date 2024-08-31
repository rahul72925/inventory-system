const { forwardRef, useImperativeHandle, useState } = require("react");

export const Modal = forwardRef(({ children }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(
    ref,
    () => {
      return {
        open() {
          setIsOpen(true);
        },
        close() {
          setIsOpen(false);
        },
      };
    },
    [isOpen]
  );

  if (!isOpen) return <></>;

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="bg-slate-400 opacity-30  absolute h-full w-full "></div>
      {children}
    </div>
  );
});
