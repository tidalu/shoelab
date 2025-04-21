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
