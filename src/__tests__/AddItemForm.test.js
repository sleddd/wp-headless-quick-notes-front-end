import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import AddItemForm from "../components/Forms/AddItemForm";
import { Provider } from "react-redux";
import { unmountComponentAtNode } from "react-dom";
import { render, fireEvent } from "@testing-library/react";

describe("AddItemForm exists", () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  let mockState = {
    items: [],
    search: []
  };
  const store = mockStore(mockState);
  let container = null;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  const setup = () => {
    let utils = render(
      <Provider store={store}>
        <AddItemForm />
      </Provider>
    );

    return {
      form: utils.container.querySelector("form"),
      select: utils.container.querySelector("#titleType"),
      ...utils
    };
  };

  it("Testing title type select change", async () => {
    const { select, queryByText } = setup();
    // Default toggle state
    expect(queryByText("Enter Item Description")).not.toBeNull();
    expect(queryByText("Upload Image")).toBeNull();
    // Make selection
    fireEvent.change(select, {
      target: { value: "image" }
    });
    // After a selection is made
    expect(select.value).toBe("image");
    await expect(queryByText("Enter Item Description")).toBeNull();
    await expect(queryByText("Upload Image")).not.toBeNull();
  });
});
