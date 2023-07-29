document.getElementById('tdeeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    calculateTDEE();
  });
  
  function calculateTDEE() {
    const units = document.getElementById('units').value;
    let gender = document.querySelector('input[name="gender"]:checked').value;
    let age = Number(document.getElementById('age').value);
    let weight = Number(document.getElementById('weight').value);
    let height = Number(document.getElementById('height').value);
    let activity = Number(document.getElementById('activity').value);
  
    if (units === 'imperial') {
        weight = weight * 0.453592; // convert lbs to kg
        height = height * 2.54; // convert inches to cm
    }
  
    // Calculate BMR using Mifflin-St Jeor equation
    let BMR;
    if (gender === 'male') {
        BMR = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        BMR = 10 * weight + 6.25 * height - 5 * age - 161;
    }
  
    // Calculate TDEE
    let TDEE = BMR * activity;
  
    // Calculate TDEE for each activity level
    let TDEESedentary = BMR * 1.2;
    let TDEELightExercise = BMR * 1.375;
    let TDEEModerateExercise = BMR * 1.55;
    let TDEEHeavyExercise = BMR * 1.725;
    let TDEEAthlete = BMR * 1.9;
  
    // Calculate macronutrient splits
    let lowCarb = {
      protein: (TDEE * 0.4) / 4,
      fat: (TDEE * 0.4) / 9,
      carbs: (TDEE * 0.2) / 4
    };
    let highCarb = {
      protein: (TDEE * 0.4) / 4,
      fat: (TDEE * 0.25) / 9,
      carbs: (TDEE * 0.35) / 4
    };
    let balanced = {
      protein: (TDEE * 0.3) / 4,
      fat: (TDEE * 0.3) / 9,
      carbs: (TDEE * 0.4) / 4
    };
  
  
    //recommended
    let weightInLbs = weight*2.2;
  
  
    let recommended = {
        protein: weightInLbs,
        fat: ((TDEE - (weightInLbs * 4)) / 2) / 9,
        carbs: ((TDEE - (weightInLbs * 4)) / 2) / 4
    };
    
  
      // Output results
      let resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = `Your Maintenance Calories are ${Math.round(TDEE)} calories per day. Your Basal Metabolic Rate is ${Math.round(BMR)} calories per day.<br>
      Sedentary: ${Math.round(TDEESedentary)} calories per day<br>
      Light Exercise: ${Math.round(TDEELightExercise)} calories per day<br>
      Moderate Exercise: ${Math.round(TDEEModerateExercise)} calories per day<br>
      Heavy Exercise: ${Math.round(TDEEHeavyExercise)} calories per day<br>
      Athlete: ${Math.round(TDEEAthlete)} calories per day<br><br>
      High Protein Low Carb (40/40/20): Protein - ${Math.round(lowCarb.protein)}g, Fat - ${Math.round(lowCarb.fat)}g, Carbs - ${Math.round(lowCarb.carbs)}g<br>
      High Protein Low Fat (40/35/25): Protein - ${Math.round(highCarb.protein)}g, Fat - ${Math.round(highCarb.fat)}g, Carbs - ${Math.round(highCarb.carbs)}g<br>
      Balanced: Protein - ${Math.round(balanced.protein)}g, Fat - ${Math.round(balanced.fat)}g, Carbs - ${Math.round(balanced.carbs)}g<br>
      Recommended: Protein - ${Math.round(recommended.protein)}g, Fat - ${Math.round(recommended.fat)}g, Carbs - ${Math.round(recommended.carbs)}g`;
    }
  