const readline = require('readline');


function calculateNutrientDifference(nutrientData) {
    let result = [];
    
    nutrientData.forEach(nutrient => {
        let diff = nutrient.value - nutrient.threshold;
        let percentageDiff = (diff / nutrient.threshold) * 100;
        
        result.push({
            name: nutrient.name,
            difference: diff.toFixed(2),
            percentageDiff: percentageDiff.toFixed(2)
        });
    });
    
    return result;
}


function displayResults(results) {
    results.forEach(result => {
        console.log(`${result.name}: Difference = ${result.difference}, Difference in % = ${result.percentageDiff}%`);
    });
}


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter product name: ", (product) => {
    rl.question("Is the product solid or liquid? (Enter 'solid' or 'liquid'): ", (productType) => {
        rl.question("Enter the serving size (in grams or ml): ", (servingSize) => {
            rl.question("Enter calories per serving: ", (calories) => {
                rl.question("Enter total added sugar per serving (g): ", (sugar) => {
                    rl.question("Enter total added fat per serving (g): ", (fat) => {
                        rl.question("Enter salt per serving (mg): ", (salt) => {
                            
                            
                            let scaledCalories = (parseFloat(calories) / servingSize) * 100;
                            let scaledSugar = (parseFloat(sugar) / servingSize) * 100;
                            let scaledFat = (parseFloat(fat) / servingSize) * 100;
                            let scaledSalt = (parseFloat(salt) / servingSize) * 100;
                            
                            
                            let thresholds = {};
                            if (productType.toLowerCase() === "solid") {
                                thresholds = {
                                    calories: 250,
                                    sugar: 3, 
                                    fat: 4.2, 
                                    salt: 625 
                                };
                            } else if (productType.toLowerCase() === "liquid") {
                                thresholds = {
                                    calories: 70,
                                    sugar: 2, 
                                    fat: 1.5, 
                                    salt: 175 
                                };
                            } else {
                                console.error("Invalid product type. Please enter either 'solid' or 'liquid'.");
                                rl.close();
                                return;
                            }
                            
                            
                            let thresholdData = [
                                { name: "Calories", value: scaledCalories, threshold: thresholds.calories },
                                { name: "Total Added Sugar", value: scaledSugar, threshold: thresholds.sugar },
                                { name: "Total Added Fat", value: scaledFat, threshold: thresholds.fat },
                                { name: "Salt (mg)", value: scaledSalt, threshold: thresholds.salt }
                            ];

                            
                            let results = calculateNutrientDifference(thresholdData);
                            displayResults(results);

                            rl.close();
                        });
                    });
                });
            });
        });
    });
});
