import {
  cleanup,
  render,
  setup,
  userEvent,
} from "$fresh-testing-library/components.ts";
import { afterEach, beforeAll, describe, it } from "$std/testing/bdd.ts";
import { Props as ScoreFormProps, ScoreForm } from "@islands/ScoreForm.tsx";
import { assertSpyCall, assertSpyCalls, spy } from "$std/testing/mock.ts";

const defaultProps: ScoreFormProps = {
  onScoreSubmit: () => {},
};

function renderForm(props: Partial<ScoreFormProps>) {
  const finalProps: ScoreFormProps = {
    ...defaultProps,
    ...props,
  };
  const user = userEvent.setup();
  const screen = render(
    <ScoreForm {...finalProps} />,
  );

  const nameField = screen.getByRole("textbox");
  const submitButton = screen.getByRole("button", {
    name: "Submit score",
  });

  async function fillNameField(str: string): Promise<void> {
    await user.type(nameField, str);
  }

  async function submitForm(): Promise<void> {
    const submitButton = screen.getByRole("button");
    await user.click(submitButton);
  }

  return {
    alert,
    submitButton,
    nameField,
    fillNameField,
    submitForm,
  };
}

describe("components/ScoreForm", () => {
  beforeAll(setup);
  afterEach(cleanup);

  it("Should not call props.onScoreSubmit when name is empty", async () => {
    // Arrange
    const onScoreSubmitSpy = spy();
    const scoreForm = renderForm({ onScoreSubmit: onScoreSubmitSpy });

    // Act
    await scoreForm.submitForm();

    // Assert
    assertSpyCalls(onScoreSubmitSpy, 0);
  });

  it("Should handle submit of score", async () => {
    // Arrange
    const onScoreSubmitSpy = spy();
    const scoreForm = renderForm({ onScoreSubmit: onScoreSubmitSpy });

    // Act
    await scoreForm.fillNameField("any-name");
    await scoreForm.submitForm();

    // Arrange
    assertSpyCall(onScoreSubmitSpy, 0, {
      args: ["any-name"],
    });
  });
});
