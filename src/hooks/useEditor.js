import { useState, useCallback, useMemo } from "react";

export function useEditor(initialComponents = []) {
  const [state, setState] = useState({
    components: initialComponents,
    activeId: null,
  });

  const activeComponent = useMemo(
    () => state.components.find((component) => component.id === state.activeId),
    [state.components, state.activeId]
  );

  const actions = {
    addComponent: useCallback((componentData) => {
      if (!componentData?.type) return;

      setState((prev) => ({
        ...prev,
        components: [
          ...prev.components,
          {
            id: crypto.randomUUID(),
            type: componentData.type,
            props: componentData.defaultProps || {},
          },
        ],
      }));
    }, []),

    updateComponent: useCallback((componentId, newProps) => {
      if (!componentId) return;

      setState((prev) => ({
        ...prev,
        components: prev.components.map((component) =>
          component.id === componentId
            ? { ...component, props: { ...component.props, ...newProps } }
            : component
        ),
      }));
    }, []),

    setActiveComponent: useCallback((id) => {
      setState((prev) => ({ ...prev, activeId: id }));
    }, []),
  };

  return {
    ...state,
    activeComponent,
    ...actions,
  };
}
