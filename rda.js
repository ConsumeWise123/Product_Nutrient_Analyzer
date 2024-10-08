const readline = require('readline');

// Nutritional data from the label (per 15g serving)
const nutritionPerServing = {
    energy: 20, // kcal
    sugar: 4.8, // g
    fat: 0.02, // g
    sodium: 136, // mg
    protein: 0.2, // g
};

// Daily recommended values for different groups based on body weight and activity
const dailyRequirementsByGroup = {
    man: {
        sedentary: { energy: 2320, protein: 60, sugar: 25, fat: 55, sodium: 2000 },
        moderate: { energy: 2730, protein: 60, sugar: 25, fat: 60, sodium: 2000 },
        heavy: { energy: 3490, protein: 60, sugar: 25, fat: 65, sodium: 2000 },
        weight: 60
    },
    woman: {
        sedentary: { energy: 1900, protein: 55, sugar: 25, fat: 50, sodium: 2000 },
        moderate: { energy: 2230, protein: 55, sugar: 25, fat: 55, sodium: 2000 },
        heavy: { energy: 2850, protein: 55, sugar: 25, fat: 60, sodium: 2000 },
        weight: 55
    },
    children: {
        '7-9 years': { energy: 1690, protein: 29.5, sugar: 25, fat: 35, sodium: 1500, weight: 25.1 },
        '10-12 years': { boys: { energy: 2010, protein: 40.3, sugar: 25, fat: 40, sodium: 1800, weight: 34.3 }, 
                        girls: { energy: 2010, protein: 40.3, sugar: 25, fat: 40, sodium: 1800, weight: 35 } },
        '13-15 years': { boys: { energy: 2750, protein: 52.5, sugar: 25, fat: 50, sodium: 2300, weight: 47.6 }, 
                        girls: { energy: 2580, protein: 46.6, sugar: 25, fat: 45, sodium: 2200, weight: 46.6 } },
        // Add more groups as necessary
    },
    infants: {
        '0-6 months': { energy: 560, protein: 9, sugar: 25, fat: 30, sodium: 200, weight: 5.4 },
        '6-12 months': { energy: 720, protein: 11, sugar: 25, fat: 35, sodium: 200, weight: 8.4 },
    }
};

function scaleNutrition(servingSize) {
    let scalingFactor = servingSize / 15; // Base serving size is 15g
    return {
        energy: nutritionPerServing.energy * scalingFactor,
        sugar: nutritionPerServing.sugar * scalingFactor,
        fat: nutritionPerServing.fat * scalingFactor,
        sodium: nutritionPerServing.sodium * scalingFactor,
        protein: nutritionPerServing.protein * scalingFactor,
    };
}

function compareWithDailyValues(scaledNutrition, dailyRequirements) {
    return {
        energyPercentage: ((scaledNutrition.energy / dailyRequirements.energy) * 100).toFixed(2),
        sugarPercentage: ((scaledNutrition.sugar / dailyRequirements.sugar) * 100).toFixed(2),
        fatPercentage: ((scaledNutrition.fat / dailyRequirements.fat) * 100).toFixed(2),
        sodiumPercentage: ((scaledNutrition.sodium / dailyRequirements.sodium) * 100).toFixed(2),
        proteinPercentage: ((scaledNutrition.protein / dailyRequirements.protein) * 100).toFixed(2),
    };
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter your group (e.g., man, woman, children, infants): ", (group) => {
    if (group.toLowerCase() === "children") {
        rl.question("Enter age range (e.g., '7-9 years', '10-12 years'): ", (ageRange) => {
            rl.question("Enter gender (boys/girls): ", (gender) => {
                rl.question("Enter serving size (in grams): ", (servingSize) => {
                    servingSize = parseFloat(servingSize);
                    if (isNaN(servingSize) || servingSize <= 0) {
                        console.error("Invalid serving size. Please enter a valid number.");
                        rl.close();
                        return;
                    }

                    let groupRequirements = dailyRequirementsByGroup.children[ageRange.toLowerCase()];
                    if (!groupRequirements || !groupRequirements[gender.toLowerCase()]) {
                        console.error("Invalid age range or gender.");
                        rl.close();
                        return;
                    }

                    let dailyRequirements = groupRequirements[gender.toLowerCase()];
                    let scaledNutrition = scaleNutrition(servingSize);
                    let comparison = compareWithDailyValues(scaledNutrition, dailyRequirements);

                    console.log(`\nNutrition values for a serving of ${servingSize}g:`);
                    console.log(`Energy: ${scaledNutrition.energy.toFixed(2)} kcal`);
                    console.log(`Sugar: ${scaledNutrition.sugar.toFixed(2)} g`);
                    console.log(`Fat: ${scaledNutrition.fat.toFixed(2)} g`);
                    console.log(`Sodium: ${scaledNutrition.sodium.toFixed(2)} mg`);
                    console.log(`Protein: ${scaledNutrition.protein.toFixed(2)} g`);

                    console.log("\nAs a percentage of daily recommended values:");
                    console.log(`Energy: ${comparison.energyPercentage}%`);
                    console.log(`Sugar: ${comparison.sugarPercentage}%`);
                    console.log(`Fat: ${comparison.fatPercentage}%`);
                    console.log(`Sodium: ${comparison.sodiumPercentage}%`);
                    console.log(`Protein: ${comparison.proteinPercentage}%`);

                    rl.close();
                });
            });
        });
    } else if (group.toLowerCase() === "infants") {
        rl.question("Enter age range (e.g., '0-6 months', '6-12 months'): ", (ageRange) => {
            rl.question("Enter serving size (in grams): ", (servingSize) => {
                servingSize = parseFloat(servingSize);
                if (isNaN(servingSize) || servingSize <= 0) {
                    console.error("Invalid serving size. Please enter a valid number.");
                    rl.close();
                    return;
                }

                let groupRequirements = dailyRequirementsByGroup.infants[ageRange.toLowerCase()];
                if (!groupRequirements) {
                    console.error("Invalid age range.");
                    rl.close();
                    return;
                }

                
                let scaledNutrition = scaleNutrition(servingSize);
                let comparison = compareWithDailyValues(scaledNutrition, groupRequirements);

                console.log(`\nNutrition values for a serving of ${servingSize}g:`);
                console.log(`Energy: ${scaledNutrition.energy.toFixed(2)} kcal`);
                console.log(`Sugar: ${scaledNutrition.sugar.toFixed(2)} g`);
                console.log(`Fat: ${scaledNutrition.fat.toFixed(2)} g`);
                console.log(`Sodium: ${scaledNutrition.sodium.toFixed(2)} mg`);
                console.log(`Protein: ${scaledNutrition.protein.toFixed(2)} g`);

                console.log("\nAs a percentage of daily recommended values:");
                console.log(`Energy: ${comparison.energyPercentage}%`);
                console.log(`Sugar: ${comparison.sugarPercentage}%`);
                console.log(`Fat: ${comparison.fatPercentage}%`);
                console.log(`Sodium: ${comparison.sodiumPercentage}%`);
                console.log(`Protein: ${comparison.proteinPercentage}%`);

                rl.close();
            });
        });
    } else {
        rl.question("Enter activity level (sedentary, moderate, heavy): ", (activityLevel) => {
            rl.question("Enter serving size (in grams): ", (servingSize) => {
                servingSize = parseFloat(servingSize);
                if (isNaN(servingSize) || servingSize <= 0) {
                    console.error("Invalid serving size. Please enter a valid number.");
                    rl.close();
                    return;
                }

                let groupRequirements = dailyRequirementsByGroup[group.toLowerCase()];
                if (!groupRequirements || !groupRequirements[activityLevel.toLowerCase()]) {
                    console.error("Invalid group or activity level.");
                    rl.close();
                    return;
                }

                let dailyRequirements = groupRequirements[activityLevel.toLowerCase()];
                let scaledNutrition = scaleNutrition(servingSize);
                let comparison = compareWithDailyValues(scaledNutrition, dailyRequirements);

                console.log(`\nNutrition values for a serving of ${servingSize}g:`);
                console.log(`Energy: ${scaledNutrition.energy.toFixed(2)} kcal`);
                console.log(`Sugar: ${scaledNutrition.sugar.toFixed(2)} g`);
                console.log(`Fat: ${scaledNutrition.fat.toFixed(2)} g`);
                console.log(`Sodium: ${scaledNutrition.sodium.toFixed(2)} mg`);
                console.log(`Protein: ${scaledNutrition.protein.toFixed(2)} g`);

                console.log("\nAs a percentage of daily recommended values:");
                console.log(`Energy: ${comparison.energyPercentage}%`);
                console.log(`Sugar: ${comparison.sugarPercentage}%`);
                console.log(`Fat: ${comparison.fatPercentage}%`);
                console.log(`Sodium: ${comparison.sodiumPercentage}%`);
                console.log(`Protein: ${comparison.proteinPercentage}%`);

                rl.close();
            });
        });
    }
});
