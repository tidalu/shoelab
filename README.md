# ShoeLab CLI

**ShoeLab** is a command-line interface (CLI) application designed to help athletes manage their running and hiking shoes. Built with Node.js, it leverages object-oriented programming (OOP) principles to generate, recommend, and track shoe usage based on user profiles, terrains, and activity levels. The application provides an interactive experience with colorful output, progress spinners, wear-level visualizations, and ASCII charts.

## Features

- **User Profile Creation**: Initialize an athlete profile with name, foot size, preferred terrain, activity level, and shoe type.
- **Shoe Generation**: Generate random running shoes and hiking boots with varied brands, models, sizes, and materials.
- **Shoe Recommendations**: Receive personalized shoe recommendations based on your profile, terrain, and activity level.
- **Run Tracking**: Log runs to track shoe wear, durability, and performance, with visual wear-level indicators.
- **Shoe Deletion**: Remove shoes from your collection.
- **Statistics**: View run history, total distance, and shoe wear with ASCII charts.
- **Data Persistence**: Save profiles, shoes, and run data as JSON files for seamless session continuity.
- **Unit Testing**: Includes comprehensive unit tests using Jest to ensure reliability of core components.
- **Interactive CLI**: Enjoy a user-friendly interface with animations, spinners, and clear prompts.

## Installation

1. **Prerequisites**:

   - Node.js (v14 or higher)
   - npm (included with Node.js)

2. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd shoelab
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Run the Application**:

   ```bash
   node src/shoelab.js
   ```

## Usage

ShoeLab provides the following commands:

| Command | Description | Example |
| --- | --- | --- |
| `init` | Create or load a user profile | `node shoelab.js init` |
| `generate` | Generate a set of shoes | `node shoelab.js generate` |
| `recommend` | Get personalized shoe recommendations | `node shoelab.js recommend` |
| `run` | Log a run and track shoe wear | `node shoelab.js run` |
| `delete` | Delete a shoe from your collection | `node shoelab.js delete` |
| `stats` | Display run history and shoe statistics with charts | `node shoelab.js stats` |
| `exit` | Exit the application | `node shoelab.js exit` |

### Example Workflow

1. **Initialize a Profile**:

   ```bash
   node shoelab.js init
   ```

   Follow prompts to enter your name, foot size, preferred terrain, and activity level.

2. **Generate Shoes**:

   ```bash
   node shoelab.js generate
   ```

   Generate 10 shoes (5 running, 5 hiking) and optionally save them.

3. **Get Recommendations**:

   ```bash
   node shoelab.js recommend
   ```

   View top 3 shoe recommendations and select one to use.

4. **Log a Run**:

   ```bash
   node shoelab.js run
   ```

   Enter the distance ran and view updated shoe durability and wear level.

5. **View Statistics**:

   ```bash
   node shoelab.js stats
   ```

   See total distance, run history, shoe stats, and ASCII charts for wear levels and run distances.

6. **Delete a Shoe**:

   ```bash
   node shoelab.js delete
   ```

   Choose a shoe to remove from your collection.

## Testing

ShoeLab includes unit tests for core components using **Jest**. The tests cover:

- **RecommendationEngine**: Scoring and ranking shoes based on athlete profiles.
- **PerformanceTracker**: Run tracking, wear level calculations, and run statistics.
- **Utilities**: File I/O (`FileManager`), input validation (`validateInput`), and shoe revival (`reviveShoes`).

### Running Tests

1. Ensure dependencies are installed:

   ```bash
   npm install
   ```

2. Run the tests:

   ```bash
   npm test
   ```

   This executes all test files in the `__tests__` directory and displays pass/fail results.

3. View coverage (optional):

   ```bash
   npm test -- --coverage
   ```

### Test Structure

```
shoelab/
├── __tests__/
│   ├── RecommendationEngine.test.js  # Tests for shoe recommendation logic
│   ├── PerformanceTracker.test.js    # Tests for run tracking and wear calculations
│   ├── FileManager.test.js           # Tests for JSON file I/O
│   ├── validateInput.test.js         # Tests for input validation
│   ├── reviveShoes.test.js           # Tests for restoring shoe objects
```

## Project Structure

```
shoelab/
├── __tests__/                       # Unit tests for core components
├── classes/
│   ├── AthleteProfile.js           # User profile management
│   ├── PerformanceTracker.js       # Tracks runs and shoe wear
│   ├── RecommendationEngine.js     # Generates shoe recommendations
│   ├── Shoe.js                    # Abstract base shoe class
│   ├── RunningShoe.js             # Running shoe subclass
│   ├── HikingBoot.js              # Hiking boot subclass
│   ├── ShoeFactory.js             # Generates random shoes
│   ├── ShoeTypes.js               # Shoe type registry
├── utils/
│   ├── askQuestion.js             # Handles user input
│   ├── FileManager.js             # Manages JSON file I/O
│   ├── getActiveUser.js           # Retrieves active user data
│   ├── loadExistingUserData.js    # Loads existing profiles
│   ├── LoadShoeData.js            # Manages shoe data persistence
│   ├── loadUserContext.js         # Centralizes user data loading
│   ├── reviveShoes.js             # Restores shoe objects
│   ├── validateInput.js           # Validates user inputs
│   ├── visualizeWearLevel.js      # Visualizes shoe wear
├── data/                          # Stores JSON data (profiles, shoes, tracker)
├── src/
│   ├── shoelab.js                # Main CLI application
├── package.json                   # Project dependencies
```

## Dependencies

- `commander`: CLI command parsing
- `chalk`: Colorful console output
- `ora`: Progress spinners
- `chalk-animation`: Animated console text
- `asciichart`: ASCII charts for statistics
- `jest`: Unit testing framework (dev dependency)

Install dependencies using:

```bash
npm install commander chalk ora chalk-animation asciichart
npm install --save-dev jest
```

## Development

To contribute or modify the project:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Make changes and commit (`git commit -m "Add your feature"`).
4. Run tests to ensure functionality (`npm test`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Open a pull request.

## Future Improvements

- Support additional shoe types (e.g., trail running shoes).
- Move hardcoded data (brands, models) to a configuration file.
- Enhance recommendations with user feedback or external data.
- Add integration tests for CLI workflows.

## License

MIT License. See LICENSE for details.

## Acknowledgments

Built as a university OOP project to demonstrate object-oriented programming principles, including encapsulation, inheritance, polymorphism, and abstraction.

**AI Assistance:** 
This project utilized Grok 3, built by xAI, to assist with generating documentation, including this README