import React, { Dispatch, SetStateAction, useState } from "react";

const FilterContext = React.createContext<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}>({
  open: false,
  setOpen: () => null,
});

// This hook can be used to access the user info.
export function useFilter() {
  const value = React.useContext(FilterContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function FiltersProvider(props: React.PropsWithChildren) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <FilterContext.Provider
      value={{
        open,
        setOpen,
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
}
