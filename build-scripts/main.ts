import { Command } from 'commander';
import { PackageJson } from 'type-fest';

enum Action {
  BUILD_ONLY,
  WATCH
};

class Main {
  private action: Action = Action.BUILD_ONLY;
  private program = new Command();

  constructor(
    private packageJson: PackageJson,
  ) {
    this.program
      .version(packageJson.version || 'unknown')
      .description('Builds the OSI extension')
      .;

      this.program
      .option('-w, --watch', 'Watch file changes and rebuild on change')
      .action();

      this.program.parse();
  }
}