const { getCommand, insertTemplate } = require('./utils/template')

const handleIssueWH = async context => {
  const issueBody = context.payload.issue.body
  const command = getCommand(issueBody)

  if (!command.action) return

  try {
    await context.github.issues.edit(
      context.issue({
        body: insertTemplate(command, issueBody),
      })
    )
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  handleIssueWH
}