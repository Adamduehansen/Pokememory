import {
  cleanup,
  render,
  setup,
  userEvent,
} from "$fresh-testing-library/components.ts";
import { afterEach, beforeAll, describe, it } from "$std/testing/bdd.ts";
import { ScoreForm } from "@components/ScoreForm.tsx";
import { assertSpyCalls, spy } from "$std/testing/mock.ts";

describe("components/ScoreForm", () => {
  beforeAll(setup);
  afterEach(cleanup);

  it("Should not call props.onScoreSubmit when name is empty", async () => {
    // Arrange
    const user = userEvent.setup();
    const onScoreSubmitSpy = spy();
    const screen = render(
      <ScoreForm onScoreSubmit={onScoreSubmitSpy} />,
    );

    // Act
    const submitButton = screen.getByRole("button");
    await user.click(submitButton);

    // Assert
    assertSpyCalls(onScoreSubmitSpy, 0);
  });
});
