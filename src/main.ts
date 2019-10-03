import * as core from "@actions/core";
import * as github from "@actions/github";

async function run() {
  try {
    const token = core.getInput("github-token", { required: true });
    const approvals = core.getInput("approvals", { required: true });

    const { pull_request_review: prr } = github.context.payload;
    core.info(JSON.stringify(github.context.payload));
    if (!prr) {
      throw new Error("Event payload missing `pull_request_review`");
    }

    const client = new github.GitHub(token);

    const { data: reviews } = await client.pulls.listReviews({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      pull_number: prr.pull_request.number
    });
    core.info(JSON.stringify(reviews));
    // if (prr.action === "submitted" && prr.state === "approved") {
    // }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
