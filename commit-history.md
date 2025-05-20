## 52f842b - Tidalu, 2025-05-20 : refactor: enhance README with additional features, installation instructions, and testing details
 README.md | 142 ++++++++++++++++++++++++++++++++++++++++++++++++--------------
 1 file changed, 110 insertions(+), 32 deletions(-)

## 8860b77 - Tidalu, 2025-05-20 : refactor:  update functionality to saveJSON method: possibilty of appending
 utils/FileManager.js | 43 ++++++++++++++++++++++++-------------------
 1 file changed, 24 insertions(+), 19 deletions(-)

## 93d692e - Tidalu, 2025-05-20 : refactor: add flattenLogs method, and implemented persistent run history
 classes/PerformanceTracker.js | 74 +++++++++++++++++++++++++++++++------------
 1 file changed, 54 insertions(+), 20 deletions(-)

## 7faa270 - Tidalu, 2025-05-20 : refactor: error handling in generate command
 bin/shoelab.js | 17 ++++++++++++-----
 1 file changed, 12 insertions(+), 5 deletions(-)

## ad4fd1c - Tidalu, 2025-05-20 : dynamic data
 data/activeUser.json        |   2 +-
 data/jjj_logs.json          |  35 ++++
 data/jjj_profile.json       |   7 +
 data/jjj_selectedShoe.json  |  12 ++
 data/jjj_shoes.json         | 122 ++++++++++++
 data/jjj_userShoeData.json  |   7 +
 data/lola_profile.json      |   7 +
 data/lola_selectedShoe.json |  12 ++
 data/lola_shoes.json        | 122 ++++++++++++
 data/lola_userShoeData.json |   7 +
 data/noah_profile.json      |   7 +
 data/noah_selectedShoe.json |  12 ++
 data/noah_shoes.json        | 122 ++++++++++++
 data/noah_userShoeData.json |   7 +
 data/undefined_logs.json    | 451 ++++++++++++++++++++++++++++++++++++++++++++
 15 files changed, 931 insertions(+), 1 deletion(-)

## 1704d30 - Tidalu, 2025-05-19 : refactor: improve shoe revival logic by returning existing instances of RunningShoe or HikingBoot
 utils/reviveShoes.js | 3 +++
 1 file changed, 3 insertions(+)

## 6457e71 - Tidalu, 2025-05-19 : refactor: standardize code formatting in loadExistingUserData.js and proper error handling
 utils/loadExistingUserData.js | 45 ++++++++++++++++++++++++-------------------
 1 file changed, 25 insertions(+), 20 deletions(-)

## a5b21d1 - Tidalu, 2025-05-19 : refactor: standardize formatting and improve code readability in input validation functions
 utils/inputValidation.js | 80 ++++++++++++++++++++++++++----------------------
 1 file changed, 43 insertions(+), 37 deletions(-)

## 13e5d90 - Tidalu, 2025-05-19 : refactor: fromat code
 classes/PerformanceTracker.js | 167 ++++++++++++++++++++++--------------------
 1 file changed, 87 insertions(+), 80 deletions(-)

## 975e352 - Tidalu, 2025-05-19 : refactor: improve tracker log loading and enhance user feedback in commands
 bin/shoelab.js | 105 +++++++++++++++++++++++++++++++++++++--------------------
 1 file changed, 69 insertions(+), 36 deletions(-)

## e158015 - Tidalu, 2025-05-19 : dynamic data
 data/activeUser.json           |   2 +-
 data/alisa_profile.json        |   6 +
 data/alisa_selectedShoe.json   |  12 ++
 data/alisa_shoes.json          | 122 +++++++++++
 data/alisa_userShoeData.json   |   7 +
 data/immmi_profile.json        |   6 +
 data/lolipop_profile.json      |   6 +
 data/lolipop_selectedShoe.json |  12 ++
 data/lolipop_shoes.json        | 122 +++++++++++
 data/lolipop_userShoeData.json |   1 +
 data/mode_profile.json         |   7 +
 data/mode_selectedShoe.json    |  12 ++
 data/mode_shoes.json           | 122 +++++++++++
 data/mode_userShoeData.json    |   7 +
 package-lock.json              | 479 +----------------------------------------
 package.json                   |  11 +-
 16 files changed, 457 insertions(+), 477 deletions(-)

## 60724e2 - Tidalu, 2025-05-19 : refactor: remove debug logs from test files
 __tests__/PerformanceTracker.test.js   | 123 ++++++++++++++++-----------------
 __tests__/RecommendationEngine.test.js |   1 -
 2 files changed, 61 insertions(+), 63 deletions(-)

## b523e2b - Tidalu, 2025-05-19 : refactor: initialize wearLevel with 0 to prevent from being NaN
 classes/RunningShoe.js | 112 +++++++++++++++++++++++++++----------------------
 1 file changed, 61 insertions(+), 51 deletions(-)

## 1aa05cb - Tidalu, 2025-05-19 : refactor: improve error handling in wearPenalty and fixing (NaN) in test
 classes/RecommendationEngine.js | 89 ++++++++++++++++++++++-------------------
 1 file changed, 47 insertions(+), 42 deletions(-)

## 7cf9d02 - Tidalu, 2025-05-19 : refactor: initialize wearLevel with 0 to prevent from being NaN
 classes/HikingBoot.js | 90 +++++++++++++++++++++++++++------------------------
 1 file changed, 48 insertions(+), 42 deletions(-)

## fd64480 - Tidalu, 2025-05-19 : refactor: improve code formatting and readability in AthleteProfile class
 classes/AthleteProfile.js | 89 +++++++++++++++++++++++++----------------------
 1 file changed, 47 insertions(+), 42 deletions(-)

## 72feb9e - Tidalu, 2025-05-19 : refactor: clean up reviveShoes test cases for consistency and readability
 __tests__/reviveShoes.test.js | 166 +++++++++++++++++++++++-------------------
 1 file changed, 90 insertions(+), 76 deletions(-)

## 03f8128 - Tidalu, 2025-05-19 : refactor: format and clean up RecommendationEngine test cases for better readability
 __tests__/RecommendationEngine.test.js | 49 +++++++++++++++++-----------------
 1 file changed, 25 insertions(+), 24 deletions(-)

## af1d77f - Tidalu, 2025-05-19 : fix: update test script to remove watch mode from jest in package.json
 package.json | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)

## 2db94aa - Tidalu, 2025-05-19 : refactor: improve shoe revival logic
 utils/reviveShoes.js | 25 +++++++++++++++++++++----
 1 file changed, 21 insertions(+), 4 deletions(-)

## 78bd9ea - Tidalu, 2025-05-19 : refactor: simplify wear level management and improve durability calculation
 classes/Shoe.js | 111 ++++++++++++++++++++++++--------------------------------
 1 file changed, 48 insertions(+), 63 deletions(-)

## e853115 - Tidalu, 2025-05-05 : fix: correct spelling and adjust scoring logic in RecommendationEngine
 __tests__/RecommendationEngine.test.js | 2 +-
 classes/RecommendationEngine.js        | 6 +++---
 2 files changed, 4 insertions(+), 4 deletions(-)

## 3f51645 - Tidalu, 2025-05-05 : fix: update wear level calculation and log timestamp format in PerformanceTracker
 __tests__/PerformanceTracker.test.js | 14 +++++++++-----
 classes/PerformanceTracker.js        |  2 +-
 2 files changed, 10 insertions(+), 6 deletions(-)

## e305be3 - Tidalu, 2025-05-04 : test for revieve shoues
 __tests__/reviveShoes.test.js   | 83 ++++++++++++++++++++++++++++++++++++++
 __tests__/validateInput.test.js | 88 +++++++++++++++++++++++++++++++++++++++++
 2 files changed, 171 insertions(+)

## 20c0762 - Tidalu, 2025-05-04 : test for recommendatkon=engine
 __tests__/RecommendationEngine.test.js | 88 ++++++++++++++++++++++++++++++++++
 1 file changed, 88 insertions(+)

## 9da2a3c - Tidalu, 2025-05-04 : test for performance tracker
 __tests__/PerformanceTracker.test.js | 67 ++++++++++++++++++++++++++++++++++++
 1 file changed, 67 insertions(+)

## e3021ee - Tidalu, 2025-05-04 : test for file manager
 __tests__/FileManager.test.js | 46 +++++++++++++++++++++++++++++++++++++++++++
 1 file changed, 46 insertions(+)

## 92b7d07 - Tidalu, 2025-05-04 : dynamic data
 data/Ahmadjon_profile.json      |   6 ++
 data/Ahmadjon_selectedShoe.json |  12 ++++
 data/Ahmadjon_shoes.json        | 122 ++++++++++++++++++++++++++++++++++++++++
 data/Ahmadjon_userShoeData.json |   1 +
 data/activeUser.json            |   2 +-
 data/otabek_profile.json        |   5 ++
 data/otabek_selectedShoe.json   |  12 ++++
 data/otabek_shoes.json          | 122 ++++++++++++++++++++++++++++++++++++++++
 data/otabek_userShoeData.json   |   7 +++
 9 files changed, 288 insertions(+), 1 deletion(-)

## 8034ebd - Tidalu, 2025-05-04 : commit history
 bin/commit-history.md | 383 --------------------------------------------------
 commit-history.md     |  58 ++++++++
 2 files changed, 58 insertions(+), 383 deletions(-)

## 17d26d8 - Tidalu, 2025-05-04 : installed jest testing lib
 package-lock.json | 4436 +++++++++++++++++++++++++++++++++++++++++++++++------
 package.json      |   13 +-
 2 files changed, 3969 insertions(+), 480 deletions(-)

## 79377b4 - Tidalu, 2025-04-22 : update commit history
 bin/commit-history.md | 383 ++++++++++++++++++++++++++++++++++++++++++++++++++
 1 file changed, 383 insertions(+)

## 41499e8 - Tidalu, 2025-04-22 : Refactor PerformanceTracker to improve wear level calculation and enhance run logging functionality
 classes/PerformanceTracker.js | 58 +++++++++++++++++++++++++++++++------------
 1 file changed, 42 insertions(+), 16 deletions(-)

## 236e998 - Tidalu, 2025-04-22 : Add stats command to display run and shoe statistics with visualizations
 bin/shoelab.js | 68 +++++++++++++++++++++++++++++++++++++++++++++++++++++++---
 1 file changed, 65 insertions(+), 3 deletions(-)

## 2c45897 - Tidalu, 2025-04-22 : dynamic data
 data/Abduahad_profile.json      |   3 +-
 data/Abduahad_selectedShoe.json |  16 ++---
 data/Abduahad_shoes.json        | 148 ++++++++++++++++++++--------------------
 data/Abduahad_userShoeData.json |   1 +
 data/activeUser.json            |   2 +-
 5 files changed, 85 insertions(+), 85 deletions(-)

## 0330567 - Tidalu, 2025-04-22 : install asciichart dependency
 package-lock.json | 7 +++++++
 package.json      | 7 ++++---
 2 files changed, 11 insertions(+), 3 deletions(-)

## e7de644 - Tidalu, 2025-04-22 : dynamic generated data
 data/Johan_profile.json      |   6 +++
 data/Johan_selectedShoe.json |  12 +++++
 data/Johan_shoes.json        | 122 +++++++++++++++++++++++++++++++++++++++++++
 data/Johan_userShoeData.json |   1 +
 data/activeUser.json         |   2 +-
 data/atiko_profile.json      |   7 +++
 6 files changed, 149 insertions(+), 1 deletion(-)

## 22ca983 - Tidalu, 2025-04-22 : refactor imrovement
 bin/shoelab.js | 147 +++++++++++++++++++++++++++++++--------------------------
 1 file changed, 80 insertions(+), 67 deletions(-)

## bae71d8 - Tidalu, 2025-04-22 : add loadUserContext function to manage user profiles and shoes
 utils/loadUserContext.js | 54 ++++++++++++++++++++++++++++++++++++++++++++++++
 1 file changed, 54 insertions(+)

## f833009 - Tidalu, 2025-04-22 : add validation for activity level, distance, and selection
 utils/inputValidation.js | 31 +++++++++++++++++++++++++++++++
 1 file changed, 31 insertions(+)

## cf74ca6 - Tidalu, 2025-04-22 : add terrain validation
 utils/inputValidation.js | 11 ++++++++++-
 1 file changed, 10 insertions(+), 1 deletion(-)

## 4e885a7 - Tidalu, 2025-04-22 : add input validation for foot size
 utils/inputValidation.js | 14 ++++++++++++++
 1 file changed, 14 insertions(+)

## 72bf5f9 - Tidalu, 2025-04-22 : add repository information to package.json
 package.json | 4 ++++
 1 file changed, 4 insertions(+)

## 064385c - Tidalu, 2025-04-22 : update commit history
 commit-history.md | 12 ++++++++++++
 1 file changed, 12 insertions(+)

## dfc6cf4 - Tidalu, 2025-04-22 : remove shoe data JSON file
 shoeData.json | 17 -----------------
 1 file changed, 17 deletions(-)

## e7c3392 - Tidalu, 2025-04-22 : add initial README.md with project overview, features, installation, usage, and development guidelines
 README.md | 143 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 1 file changed, 143 insertions(+)

## 96f9934 - Tidalu, 2025-04-22 : add commit history documentation
 commit-history.md | 313 ++++++++++++++++++++++++++++++++++++++++++++++++++++++
 1 file changed, 313 insertions(+)

## e843707 - Tidalu, 2025-04-22 : dynamic data generated
 data/Jakub_profile.json      |   7 +++
 data/Jakub_selectedShoe.json |  12 +++++
 data/Jakub_shoes.json        | 122 +++++++++++++++++++++++++++++++++++++++++++
 data/Jakub_userShoeData.json |  12 +++++
 data/_shoes.json             | 122 -------------------------------------------
 data/activeUser.json         |   2 +-
 data/shoeData.json           |   7 ---
 shoeData.json                |  18 +++++--
 8 files changed, 168 insertions(+), 134 deletions(-)

## 4db0f83 - Tidalu, 2025-04-22 : comment out shoe data save in runAction function
 bin/shoelab.js | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)

## f637fb0 - Tidalu, 2025-04-22 : adedd interactiveness
 bin/shoelab.js | 233 +++++++++++++++++++++++++++++----------------------------
 1 file changed, 118 insertions(+), 115 deletions(-)

## 8a973c8 - Tidalu, 2025-04-22 : dynamic data gen
 data/DDER_selectedShoe.json | 4 ++--
 data/DDER_userShoeData.json | 6 +++---
 shoeData.json               | 7 +++++++
 3 files changed, 12 insertions(+), 5 deletions(-)

## eb5af1e - Tidalu, 2025-04-22 : installed chalk-animation and ora
 package-lock.json | 1011 +++++++++++++++++++++++++++++++++++++++++++++++++++++
 package.json      |    2 +
 2 files changed, 1013 insertions(+)

## b96dc6c - Tidalu, 2025-04-22 : cleared debug logs
 bin/shoelab.js                  | 3 ---
 classes/PerformanceTracker.js   | 1 -
 classes/RecommendationEngine.js | 5 -----
 classes/ShoeFactory.js          | 8 ++++----
 utils/LoadShoeData.js           | 2 --
 5 files changed, 4 insertions(+), 15 deletions(-)

## f0a8ff4 - Tidalu, 2025-04-22 : dynamicly generated data
 data/DDER_profile.json      |   7 +++
 data/DDER_selectedShoe.json |  12 +++++
 data/DDER_shoes.json        | 122 ++++++++++++++++++++++++++++++++++++++++++++
 data/DDER_userShoeData.json |   7 +++
 data/activeUser.json        |   2 +-
 shoeData.json               |   7 ---
 6 files changed, 149 insertions(+), 8 deletions(-)

## e93394f - Tidalu, 2025-04-21 : extracted VisualizeWearLevel function from app.js
 utils/visualizeWearLevel.js | 11 +++++++++++
 1 file changed, 11 insertions(+)

## 1640311 - Tidalu, 2025-04-21 : created reviveShoe() to assign return data from json to proper class
 utils/reviveShoes.js | 22 ++++++++++++++++++++++
 1 file changed, 22 insertions(+)

## 5dd4092 - Tidalu, 2025-04-21 : added saveShoeData function
 utils/LoadShoeData.js | 29 ++++++++++++++++++++++-------
 1 file changed, 22 insertions(+), 7 deletions(-)

## 13275be - Tidalu, 2025-04-21 : created module for easy acessing user data
 utils/getActiveUser.js | 59 ++++++++++++++++++++++++++++++++++++++++++++++++++
 1 file changed, 59 insertions(+)

## ec32881 - Tidalu, 2025-04-21 : created ShoeTypes
 classes/ShoeTypes.js | 9 +++++++++
 1 file changed, 9 insertions(+)

## 183bfe8 - Tidalu, 2025-04-21 : set default baseDurability
 classes/ShoeFactory.js | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)

## 95bd1e5 - Tidalu, 2025-04-21 : set default baseDurability
 classes/RunningShoe.js | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)

## 7b399a1 - Tidalu, 2025-04-21 : debug logs
 classes/RecommendationEngine.js | 6 ++++++
 1 file changed, 6 insertions(+)

## 3128af5 - Tidalu, 2025-04-21 : implemented static calculateWearLevel and trackRun methods
 classes/PerformanceTracker.js | 26 +++++++++++++++++++++++++-
 1 file changed, 25 insertions(+), 1 deletion(-)

## ea63d3a - Tidalu, 2025-04-21 : set default baseDurability , fix class name from HikingBook
 classes/HikingBoot.js | 6 +++---
 1 file changed, 3 insertions(+), 3 deletions(-)

## 889e863 - Tidalu, 2025-04-21 : dynamic generated data
 bin/shoelab.js             | 409 +++++++++++++++++++++++++++------------------
 data/Sam_profile.json      |   7 +
 data/Sam_selectedShoe.json |  12 ++
 data/Sam_shoes.json        | 122 ++++++++++++++
 data/Sam_userShoeData.json |  27 +++
 data/activeUser.json       |   2 +-
 shoeData.json              |   8 +-
 7 files changed, 417 insertions(+), 170 deletions(-)

## aab5e13 - Tidalu, 2025-04-21 : dynamic gen data
 data/Abduahad_profile.json      |   7 +++
 data/Abduahad_selectedShoe.json |  12 ++++
 data/Abduahad_shoes.json        | 122 +++++++++++++++++++++++++++++++++++
 data/Akbar_profile.json         |   7 +++
 data/Moodan_profile.json        |   7 +++
 data/Moodan_selectedShoe.json   |  12 ++++
 data/Moodan_shoes.json          | 122 +++++++++++++++++++++++++++++++++++
 data/_shoes.json                | 136 ++++++++++++++++++++--------------------
 data/activeUser.json            |   3 +
 data/shoeData.json              |   7 +++
 shoeData.json                   |   8 +--
 11 files changed, 371 insertions(+), 72 deletions(-)

## ba227ec - Tidalu, 2025-04-21 : implemented loadShoeData fucntion in separate from app.js to be able to use in other file locations
 utils/LoadShoeData.js | 13 +++++++++++++
 1 file changed, 13 insertions(+)

## ddaa0b7 - Tidalu, 2025-04-21 : extracted and created new module for LoadExistingFiles() function from app.js
 utils/loadExistingUserData.js | 40 ++++++++++++++++++++++++++++++++++++++++
 1 file changed, 40 insertions(+)

## c2d8911 - Tidalu, 2025-04-21 : created helper fucntion using readline to get user input
 utils/askQuestion.js | 20 ++++++++++++++++++++
 1 file changed, 20 insertions(+)

## 810ea9c - Tidalu, 2025-04-21 : remove unused files
 commands/delete.js    | 0
 commands/init.js      | 0
 commands/recommend.js | 0
 commands/run.js       | 0
 4 files changed, 0 insertions(+), 0 deletions(-)

## c09774a - Tidalu, 2025-04-21 : dynamicly generated data files
 data/Ali_profile.json       |   6 +++
 data/_shoes.json            | 122 ++++++++++++++++++++++++++++++++++++++++++++
 data/undefined_profile.json |   1 +
 3 files changed, 129 insertions(+)

## caefd09 - Tidalu, 2025-04-21 : implemented ShoeLab CLI with code of app.js
 bin/shoelab.js | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)

## 477ed20 - Tidalu, 2025-04-21 : Implement ShoeLab CLI with almost identical implementaton in app.js
 bin/shoelab.js | 245 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 1 file changed, 245 insertions(+)

## 5a3a373 - Tidalu, 2025-04-21 : extracting loadExistingFiles function as module
 app.js | 28 +---------------------------
 1 file changed, 1 insertion(+), 27 deletions(-)

## 526fd86 - Tidalu, 2025-04-21 : install new library : chalk
 package-lock.json | 61 ++++++++++++++++++++++++++++++++++++++++++++++++++-----
 package.json      |  6 ++++--
 2 files changed, 60 insertions(+), 7 deletions(-)

## 4ddab58 - Tidalu, 2025-04-20 : add initial command files and update package.json to turn into real cli
 bin/shoelab.js        | 0
 commands/delete.js    | 0
 commands/init.js      | 0
 commands/recommend.js | 0
 commands/run.js       | 0
 package.json          | 3 +++
 6 files changed, 3 insertions(+)

## 5d3c7da - Tidalu, 2025-04-20 : add functionality to delete shoes from data, including user prompts and data persistence
 app.js                          | 29 +++++++++++++++++++++++++++++
 data/ulugbelk_selectedShoe.json | 10 +++++-----
 shoeData.json                   | 16 +++-------------
 3 files changed, 37 insertions(+), 18 deletions(-)

## 1175ec5 - Tidalu, 2025-04-20 : automatic user data
 data/ulugbelk_profile.json      |  6 ++++++
 data/ulugbelk_selectedShoe.json | 12 ++++++++++++
 shoeData.json                   | 11 ++++++++---
 3 files changed, 26 insertions(+), 3 deletions(-)

## ad2dd13 - Tidalu, 2025-04-20 : add FileManager module for JSON data saving and loading functionality
 utils/FileManager.js | 28 ++++++++++++++++++++++++++++
 1 file changed, 28 insertions(+)

## 75fb5d4 - Tidalu, 2025-04-20 : streamline file loading and shoe selection process, enhance data saving
 app.js | 327 ++++++++++++++++++++++++++++++++++++++++-------------------------
 1 file changed, 203 insertions(+), 124 deletions(-)

## b0f32e9 - Tidalu, 2025-04-20 :  implement shoe data persistence with JSON file for saving and loading shoe data
 app.js        | 19 ++++++++++++++++++-
 shoeData.json | 12 ++++++++++++
 2 files changed, 30 insertions(+), 1 deletion(-)

## 664f88c - Tidalu, 2025-04-20 :  enhance wear level visualization and update shoe recommendation logic
 app.js | 25 ++++++++++++++++++++++---
 1 file changed, 22 insertions(+), 3 deletions(-)

## 08eed28 - Tidalu, 2025-04-20 : enhance shoe data tracking and wear level calculation
 app.js | 48 ++++++++++++++++++++++++++++++++++++++++++------
 1 file changed, 42 insertions(+), 6 deletions(-)

## 7b7aede - Tidalu, 2025-04-20 : refactor: enhance shoe wear level calculation and display updated durability
 app.js | 22 ++++++++++++++++++++--
 1 file changed, 20 insertions(+), 2 deletions(-)

## 2d35bf1 - Tidalu, 2025-04-20 : refactor: comment out unused inquirer import and streamline shoe selection process
 app.js | 13 ++++++++++---
 1 file changed, 10 insertions(+), 3 deletions(-)

## 40750cb - Tidalu, 2025-04-20 : refactor: update wearLevel calculation to use durabilityLeft for accuracy
 classes/Shoe.js | 4 +++-
 1 file changed, 3 insertions(+), 1 deletion(-)

## d2fc61c - Tidalu, 2025-04-20 : refactor: simplify getComfortScore method and improve cushioning bonus calculation
 classes/RunningShoe.js | 20 ++++++++++----------
 1 file changed, 10 insertions(+), 10 deletions(-)

## 641a532 - Tidalu, 2025-04-20 : refactor: remove debug log and simplify wear penalty calculation
 classes/RecommendationEngine.js | 7 +++----
 1 file changed, 3 insertions(+), 4 deletions(-)

## fc774e6 - Tidalu, 2025-04-20 : refactor: use constructor name for type in getDetailedInfo method
 classes/HikingBoot.js | 5 +++--
 1 file changed, 3 insertions(+), 2 deletions(-)

## 020462f - Tidalu, 2025-04-20 : add readline and inquirer dependencies
 package-lock.json | 9 ++++++++-
 package.json      | 3 ++-
 2 files changed, 10 insertions(+), 2 deletions(-)

## 92266d9 - Tidalu, 2025-04-20 : implement interactive CLI for ShoeLab with user input prompts
 app.js | 57 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 1 file changed, 57 insertions(+)

## ea36c9e - Tidalu, 2025-04-20 : remove example codes
 app.js | 24 ------------------------
 1 file changed, 24 deletions(-)

## 86038cf - Tidalu, 2025-04-20 : remove logs
 classes/RecommendationEngine.js | 3 ---
 1 file changed, 3 deletions(-)

## bab7925 - Tidalu, 2025-04-20 : fix typos and improve scoring logic in RecommendationEngine.js
 classes/RecommendationEngine.js | 24 ++++++++++++++++--------
 1 file changed, 16 insertions(+), 8 deletions(-)

## 478ec56 - Tidalu, 2025-04-20 : fix typo in getStepIntensity method of AthleteProfile.js
 classes/AthleteProfile.js | 4 ++--
 1 file changed, 2 insertions(+), 2 deletions(-)

## ed8d59b - Tidalu, 2025-04-20 : fix typo in RecommendationEngine.js for includes method
 classes/RecommendationEngine.js | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)

## f9caca6 - Tidalu, 2025-04-20 : fix performance tracking loop to simulate tracking for each shoe
 app.js | 5 ++++-
 1 file changed, 4 insertions(+), 1 deletion(-)

## 65381b3 - Tidalu, 2025-04-20 : add logging to debug
 classes/PerformanceTracker.js | 1 +
 1 file changed, 1 insertion(+)

## c461bf3 - Tidalu, 2025-04-20 : fix type in the file name
 classes/{RecommentationEngine.js => RecommendationEngine.js} | 0
 1 file changed, 0 insertions(+), 0 deletions(-)

## bc9ae8b - Tidalu, 2025-04-20 : fix typo in ShoeFactory.js for RunningShoe and generateMany method
 classes/ShoeFactory.js | 6 +++---
 1 file changed, 3 insertions(+), 3 deletions(-)

## a674e29 - Tidalu, 2025-04-20 : refactor app.js to enhance shoe generation and add recommendation engine test
 app.js | 19 +++++++++++++++++--
 1 file changed, 17 insertions(+), 2 deletions(-)

## 762623f - Tidalu, 2025-04-20 : create RecommendationEngine based on the athlete preferences
 classes/RecommentationEngine.js | 40 ++++++++++++++++++++++++++++++++++++++++
 1 file changed, 40 insertions(+)

## e124564 - Tidalu, 2025-04-20 : fix destructing bug in logStep by creating log entry
 classes/PerformanceTracker.js | 18 +++++++++---------
 1 file changed, 9 insertions(+), 9 deletions(-)

## 7e93010 - Tidalu, 2025-04-20 :  update script commands in package.json
 package.json | 5 +++--
 1 file changed, 3 insertions(+), 2 deletions(-)

## 17dd395 - Tidalu, 2025-04-20 : see PerformanceTracker in action
 app.js | 11 +++++++++++
 1 file changed, 11 insertions(+)

## a16af91 - Tidalu, 2025-04-20 : Add PerformanceTracker to log snf traack shoe wear
 classes/PerformanceTracker.js | 46 +++++++++++++++++++++++++++++++++++++++++++
 1 file changed, 46 insertions(+)

## c661522 - Tidalu, 2025-04-20 : create ShoeFactory to generate test shoes
 classes/ShoeFactory.js | 40 ++++++++++++++++++++++++++++++++++++++++
 1 file changed, 40 insertions(+)

## 08949f1 - Tidalu, 2025-04-19 : create ActivityProfile class
 classes/AthleteProfile.js | 51 +++++++++++++++++++++++++++++++++++++++++++++++
 1 file changed, 51 insertions(+)

## fba5736 - Tidalu, 2025-04-16 : created Hiking boots class
 classes/HikingBoot.js | 52 +++++++++++++++++++++++++++++++++++++++++++++++++++
 1 file changed, 52 insertions(+)

## 19183de - Tidalu, 2025-04-16 : Add RunningShoe class
 classes/RunningShoe.js | 63 ++++++++++++++++++++++++++++++++++++++++++++++++++
 1 file changed, 63 insertions(+)

## f22c344 - Tidalu, 2025-04-16 : created base Shoe class abstract class
 classes/Shoe.js | 64 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 1 file changed, 64 insertions(+)

## d9a8397 - Tidalu, 2025-04-15 : init project, git, project folder structure
 .gitignore        |   1 +
 package-lock.json | 608 ++++++++++++++++++++++++++++++++++++++++++++++++++++++
 package.json      |  19 ++
 3 files changed, 628 insertions(+)
