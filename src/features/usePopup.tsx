import CallPopup from "@/ui/popups/CallPopup/CallPopup";
import PopupWrapper from "@/ui/popups/PopupWrapper/PopupWrapper";
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";

type PopupArgs = Record<string, unknown>;

type PopupRegistryProps = {
  call: PopupArgs;
};

type PopupRegistry = Record<
  keyof PopupRegistryProps,
  PopupComponent<keyof PopupRegistryProps>
>;

export const POPUPS: PopupRegistry = {
  call: CallPopup,
};

type PopupContextValue = {
  openPopup: <P extends keyof PopupRegistryProps>(
    name: P,
    props?: PopupRegistryProps[P],
  ) => void;
  closePopup: () => void;
};

export type PopupComponent<P extends keyof PopupRegistryProps> = FC<
  { props?: PopupRegistryProps[P] } & { closePopup: () => void }
>;

type PopupProviderProps = {
  registry: PopupRegistry;
  portalComponent?: Element;
} & PropsWithChildren;

type CurrentPopup = {
  name: keyof PopupRegistryProps;
  props?: PopupArgs;
};

export const PopupContext = createContext<PopupContextValue | null>(null);

export function PopupProvider({
  registry,
  portalComponent,
  children,
}: PopupProviderProps) {
  const [current, setCurrent] = useState<CurrentPopup | null>(null);
  const openPopup = useCallback<PopupContextValue["openPopup"]>(
    (name, props) => {
      if (!registry[name]) {
        console.error(`Попап с названием '${name}' не найден`);
        return;
      }

      setCurrent({ name, props });
    },
    [registry],
  );

  const closePopup = useCallback<PopupContextValue["closePopup"]>(
    () => setCurrent(null),
    [],
  );

  const value = useMemo<PopupContextValue>(
    () => ({ openPopup, closePopup }),
    [openPopup, closePopup],
  );

  const popupNode = current
    ? (() => {
        const Component = registry[current.name];
        const content = (
          <PopupWrapper>
            <Component closePopup={closePopup} {...current.props} />
          </PopupWrapper>
        );

        return createPortal(content, portalComponent ?? document.body);
      })()
    : null;

  return (
    <PopupContext.Provider value={value}>
      {children}
      {popupNode}
    </PopupContext.Provider>
  );
}

export const usePopup = (): PopupContextValue => {
  const ctx = useContext(PopupContext);
  if (!ctx)
    throw new Error(
      "Компонент, который использует useModal должен быть внутри компонента <PopupProvider>",
    );
  return ctx;
};
