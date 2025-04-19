import { QueryStringState, QueryStateAction } from "./types";

export function queryStateReducer(
  currentState: QueryStringState,
  action: QueryStateAction
): QueryStringState {
  switch (action.type) {
    case "add": {
      const exists = currentState.organizations.some(
        (node) => node.organizationName === action.payload.organizationName
      );
      if (exists) return currentState;
      return {
        ...currentState,
        organizations: [...currentState.organizations, action.payload],
      };
    }

    case "remove": {
      return {
        ...currentState,
        organizations: currentState.organizations.filter(
          (node) => node.organizationName !== action.payload.organizationName
        ),
      };
    }

    case "change": {
      return {
        ...currentState,
        organizations: currentState.organizations.map((node) =>
          node.organizationName === action.payload.organizationName
            ? action.payload
            : node
        ),
      };
    }

    case "choose-filter": {
      const { organizationName, filterType, value } = action.payload;

      return {
        ...currentState,
        organizations: currentState.organizations.map((node) => {
          if (node.organizationName !== organizationName) return node;

          const currentValue = node[filterType];

          return {
            ...node,
            [filterType]: currentValue === value ? undefined : value,
          };
        }),
      };
    }

    default:
      return currentState;
  }
}
