# ShoeLab CLI

**ShoeLab** is a command-line interface (CLI) application designed to help athletes manage their running and hiking shoes. Built with Node.js, it leverages object-oriented programming (OOP) principles to generate, recommend, and track shoe usage based on user profiles, terrains, and activity levels. The application provides an interactive experience with colorful output, progress spinners, and wear-level visualizations.

## Features

- **User Profile Creation**: Initialize an athlete profile with name, foot size, preferred terrain, activity level, and shoe type.
- **Shoe Generation**: Generate random running shoes and hiking boots with varied brands, models, sizes, and materials.
- **Shoe Recommendations**: Receive personalized shoe recommendations based on your profile, terrain, and activity level.
- **Run Tracking**: Log runs to track shoe wear, durability, and performance, with visual wear-level indicators.
- **Shoe Deletion**: Remove shoes from your collection.
- **Data Persistence**: Save profiles, shoes, and run data as JSON files for seamless session continuity.
- **Interactive CLI**: Enjoy a user-friendly interface with animations, spinners, and clear prompts.

## Installation

1. **Prerequisites**:

   - Node.js 
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
   node bin/shoelab.js
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

5. **Delete a Shoe**:

   ```bash
   node shoelab.js delete
   ```

   Choose a shoe to remove from your collection.

## Project Structure

```
shoelab/
├── bin/
│   ├── shoelab.js             # Main CLI application
├── classes/
│   ├── AthleteProfile.js       # User profile management
│   ├── PerformanceTracker.js   # Tracks runs and shoe wear
│   ├── RecommendationEngine.js # Generates shoe recommendations
│   ├── Shoe.js                # Abstract base shoe class
│   ├── RunningShoe.js         # Running shoe subclass
│   ├── HikingBoot.js          # Hiking boot subclass
│   ├── ShoeFactory.js         # Generates random shoes
│   ├── ShoeTypes.js           # Shoe type registry
├── utils/
│   ├── askQuestion.js         # Handles user input
│   ├── FileManager.js         # Manages JSON file I/O
│   ├── getActiveUser.js       # Retrieves active user data
│   ├── loadExistingUserData.js# Loads existing profiles
│   ├── LoadShoeData.js        # Manages shoe data persistence
│   ├── reviveShoes.js         # Restores shoe objects
│   ├── visualizeWearLevel.js  # Visualizes shoe wear
├── app.js                     # Non-CLI entry point for running the full app logic in sequence (for testing only)
├── data/                      # Stores JSON data (profiles, shoes)
├── package.json               # Project dependencies
├── commit-history.md          # Project commit history 
├── .gitignore                 # To exclude unnecessary files
```

## Development

To contribute or modify the project:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Make changes and commit (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## Future Improvements

- Add input validation for foot size, terrain, and activity level.
- Centralize user data loading logic to reduce code duplication.
- Implement unit tests with Jest or Mocha.
- Support additional shoe types (e.g., trail running shoes).
- Add visualizations for run history and shoe stats.

