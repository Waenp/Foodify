// Skapa ett template för alla kort på sökresultat-sidan
const cardTemplate = `
<div class="card mb-3">
  <div class="row g-0">
    <div class="col-lg-4">
      <img src="" class="img-food rounded-start" alt="..." id="recipeImg">
    </div>
    <div class="col-lg-8 d-flex flex-column">
      <div class="card-body overflow-auto">
        <h5 class="card-title" id="recipeName"></h5>
        <p class="card-text" id="recipeDescription"></div>
      <div class="card-footer d-grid gap-2 d-lg-flex mt-auto">
        <p class="text-muted me-auto" id="cookTime"></p>
        <a href="recipe-page.html" class="bbb btn btn-full-recipe">Full recipe</a>
        <a href="/views/create-playlist/authorize.html" class="sss btn btn-create-playlist">Create playlist!</a>
      </div>
    </div>
  </div>
</div>
`;

$(document).ready(function addCard() {
  let recipes = [
    {
      id: "640803",
      title: "Crispy Buttermilk Fried Chicken",
      readyInMinutes: 45,
      servings: 6,
      sourceUrl:
          "https://www.foodista.com/recipe/G2QDD6GF/crispy-buttermilk-fried-chicken",
      spoonacularSourceUrl:
          "https://spoonacular.com/crispy-buttermilk-fried-chicken-640803",
      image: "https://spoonacular.com/recipeImages/640803-556x370.jpg",
      summary:
          'Forget going out to eat or ordering takeout every time you crave Southern food. Try making Crispy Buttermilk Fried Chicken at home. One portion of this dish contains roughly <b>16g of protein</b>, <b>15g of fat</b>, and a total of <b>260 calories</b>. For <b>62 cents per serving</b>, this recipe <b>covers 9%</b> of your daily requirements of vitamins and minerals. This recipe serves 6. 53 people found this recipe to be delicious and satisfying. This recipe from Foodista requires vegetable oil, buttermilk, salt, and paprika. It works best as a main course, and is done in roughly <b>around 45 minutes</b>. Taking all factors into account, this recipe <b>earns a spoonacular score of 38%</b>, which is rather bad. Users who liked this recipe also liked <a href="https://spoonacular.com/recipes/crispy-buttermilk-fried-chicken-912357">Crispy Buttermilk Fried Chicken</a>, <a href="https://spoonacular.com/recipes/crispy-buttermilk-fried-chicken-32074">Crispy Buttermilk Fried Chicken</a>, and <a href="https://spoonacular.com/recipes/crispy-oven-fried-buttermilk-chicken-244810">Crispy Oven Fried Buttermilk Chicken</a>.',
      cuisines: ["Southern"],
      instructions:
          "Mix flour, salt, paprika and pepper. Dip chicken in buttermilk and then into flour mixture. Cook chicken in oil, starting on medium-high heat, then, when chicken is browned, reduce heat to medium and cook an additional 30 to 35 minutes until chicken is done (approx 150-155 degrees F internal), turning occasionally.",
      analyzedInstructions: [
        {
          steps: [
            {
              number: 1,
              step: "Mix flour, salt, paprika and pepper. Dip chicken in buttermilk and then into flour mixture. Cook chicken in oil, starting on medium-high heat, then, when chicken is browned, reduce heat to medium and cook an additional 30 to 35 minutes until chicken is done (approx 150-155 degrees F internal), turning occasionally.",
              equipment: [],
            },
          ],
        },
      ],
      extendedIngredients: [
        {
          nameClean: "whole chicken",
          measures: {
            metric: {
              amount: 907.185,
              unitShort: "g",
            },
          },
        },
        {
          nameClean: "wheat flour",
          measures: {
            metric: {
              amount: 177.441,
              unitShort: "ml",
            },
          },
        },
        {
          nameClean: "table salt",
          measures: {
            metric: {
              amount: 2,
              unitShort: "tsps",
            },
          },
        },
        {
          nameClean: "paprika",
          measures: {
            metric: {
              amount: 1,
              unitShort: "tsp",
            },
          },
        },
        {
          nameClean: "black pepper",
          measures: {
            metric: {
              amount: 1,
              unitShort: "tsp",
            },
          },
        },
        {
          nameClean: "buttermilk",
          measures: {
            metric: {
              amount: 236.588,
              unitShort: "ml",
            },
          },
        },
        {
          measures: {
            metric: {
              amount: 1,
              unitShort: "serving",
            },
          },
        },
      ],
    },
    {
      id: "665734",
      title: "Zucchini Chicken Omelette",
      readyInMinutes: 45,
      servings: 2,
      sourceUrl:
          "https://www.foodista.com/recipe/TPJ6QNBY/zucchini-chicken-omelette",
      spoonacularSourceUrl:
          "https://spoonacular.com/zucchini-chicken-omelette-665734",
      image: "https://spoonacular.com/recipeImages/665734-556x370.jpg",
      summary:
          'If you have about <b>approximately 45 minutes</b> to spend in the kitchen, Zucchini Chicken Omelette might be a super <b>gluten free, dairy free, fodmap friendly, and whole 30</b> recipe to try. This recipe makes 2 servings with <b>210 calories</b>, <b>13g of protein</b>, and <b>16g of fat</b> each. For <b>72 cents per serving</b>, this recipe <b>covers 11%</b> of your daily requirements of vitamins and minerals. A mixture of eggs, water, zucchini, and a handful of other ingredients are all it takes to make this recipe so yummy. It works well as a very reasonably priced main course. 5 people have tried and liked this recipe. It is brought to you by Foodista. All things considered, we decided this recipe <b>deserves a spoonacular score of 35%</b>. This score is not so tremendous. Similar recipes include <a href="https://spoonacular.com/recipes/zucchini-omelette-631011">Zucchini omelette</a>, <a href="https://spoonacular.com/recipes/potato-zucchini-omelette-78424">Potato & Zucchini Omelette</a>, and <a href="https://spoonacular.com/recipes/smoked-salmon-omelette-with-sweet-soy-sauce-sriracha-how-to-have-omelette-for-dinner-494061"> Smoked Salmon Omelette with Sweet Soy Sauce & Sriracha & How to Have Omelette for Dinner</a>.',
      cuisines: [],
      instructions:
          "Beat eggs and water in a bowl. Mix in grated zucchini and season with salt and pepper. Heat the oil in a small, non-stick skillet. When hot, add half the egg mixture and cook for 1 minute until the egg begins to set. Scatter evenly with half diced chicken.\nCook for a further 1-2 minutes, until the egg is golden underneath, and just set on top. Slide out onto a serving plate, folding it over as you go. Repeat. Serve the omelette with your favourite salad.",
      analyzedInstructions: [
        {
          steps: [
            {
              number: 1,
              step: "Beat eggs and water in a bowl.",
              equipment: [
                {
                  name: "bowl",
                },
              ],
            },
            {
              number: 2,
              step: "Mix in grated zucchini and season with salt and pepper.",
              equipment: [],
            },
            {
              number: 3,
              step: "Heat the oil in a small, non-stick skillet. When hot, add half the egg mixture and cook for 1 minute until the egg begins to set. Scatter evenly with half diced chicken.",
              equipment: [
                {
                  name: "frying pan",
                },
              ],
            },
            {
              number: 4,
              step: "Cook for a further 1-2 minutes, until the egg is golden underneath, and just set on top. Slide out onto a serving plate, folding it over as you go. Repeat.",
              equipment: [],
            },
            {
              number: 5,
              step: "Serve the omelette with your favourite salad.",
              equipment: [],
            },
          ],
        },
      ],
      extendedIngredients: [
        {
          nameClean: "egg",
          measures: {
            metric: {
              amount: 3,
              unitShort: "",
            },
          },
        },
        {
          nameClean: "water",
          measures: {
            metric: {
              amount: 1,
              unitShort: "Tbsp",
            },
          },
        },
        {
          nameClean: "zucchini",
          measures: {
            metric: {
              amount: 150,
              unitShort: "g",
            },
          },
        },
        {
          nameClean: "salt and pepper",
          measures: {
            metric: {
              amount: 1,
              unitShort: "serving",
            },
          },
        },
        {
          nameClean: "cooking oil",
          measures: {
            metric: {
              amount: 1,
              unitShort: "Tbsp",
            },
          },
        },
        {
          nameClean: "whole chicken",
          measures: {
            metric: {
              amount: 80,
              unitShort: "g",
            },
          },
        },
      ],
    },
    {
      id: "658491",
      title: "Roasted Asparagus With Bacon and Feta Cheese",
      readyInMinutes: 45,
      servings: 6,
      sourceUrl:
          "http://www.foodista.com/recipe/WJQ4858P/roasted-asparagus-with-bacon-and-feta-cheese",
      spoonacularSourceUrl:
          "https://spoonacular.com/roasted-asparagus-with-bacon-and-feta-cheese-658491",
      image: "https://spoonacular.com/recipeImages/658491-556x370.jpg",
      summary:
          'Roasted Asparagus With Bacon and Feta Cheese might be just the side dish you are searching for. This gluten free and primal recipe serves 6 and costs <b>$1.12 per serving</b>. One serving contains <b>285 calories</b>, <b>6g of protein</b>, and <b>28g of fat</b>. Only a few people made this recipe, and 3 would say it hit the spot. A mixture of olive oil, bacon, feta cheese, and a handful of other ingredients are all it takes to make this recipe so tasty. <b>Easter</b> will be even more special with this recipe. From preparation to the plate, this recipe takes roughly <b>45 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 25%</b>. This score is rather bad. Try <a href="https://spoonacular.com/recipes/roasted-asparagus-with-feta-cheese-315678">Roasted Asparagus with Feta Cheese</a>, <a href="https://spoonacular.com/recipes/roasted-asparagus-quinoa-salad-w-feta-cheese-521842">Roasted Asparagus Quinoa Salad W/ Feta Cheese</a>, and <a href="https://spoonacular.com/recipes/roasted-asparagus-with-goat-cheese-and-bacon-115507">Roasted Asparagus with Goat Cheese and Bacon</a> for similar recipes.',
      cuisines: [],
      instructions:
          "<ol><li>Preheat oven to 500.</li><li>Place the asparagus on a baking sheet covered with aluminum foil.</li><li>Drizzle with olive oil, coat well, and add salt and pepper.</li><li>Cook the asparagus for about 8 to 10 minutes, or until tender.</li><li>In the meantime, cook the bacon in a skillet until crisp.</li><li>Put the bacon on a paper towel, drain, and crumble; set aside.</li><li>Remove the asparagus from the oven and put it on a platter.</li><li>Sprinkle with bacon, then feta cheese.</li><li>Serve warm.</li></ol>",
      analyzedInstructions: [
        {
          steps: [
            {
              number: 1,
              step: "Preheat oven to 50",
              equipment: [
                {
                  name: "oven",
                },
              ],
            },
            {
              number: 2,
              step: "Place the asparagus on a baking sheet covered with aluminum foil.",
              equipment: [
                {
                  name: "aluminum foil",
                },
                {
                  name: "baking sheet",
                },
              ],
            },
            {
              number: 3,
              step: "Drizzle with olive oil, coat well, and add salt and pepper.Cook the asparagus for about 8 to 10 minutes, or until tender.In the meantime, cook the bacon in a skillet until crisp.",
              equipment: [
                {
                  name: "frying pan",
                },
              ],
            },
            {
              number: 4,
              step: "Put the bacon on a paper towel, drain, and crumble; set aside.",
              equipment: [
                {
                  name: "paper towels",
                },
              ],
            },
            {
              number: 5,
              step: "Remove the asparagus from the oven and put it on a platter.",
              equipment: [
                {
                  name: "oven",
                },
              ],
            },
            {
              number: 6,
              step: "Sprinkle with bacon, then feta cheese.",
              equipment: [],
            },
            {
              number: 7,
              step: "Serve warm.",
              equipment: [],
            },
          ],
        },
      ],
      extendedIngredients: [
        {
          nameClean: "asparagus",
          measures: {
            metric: {
              amount: 12,
              unitShort: "medium",
            },
          },
        },
        {
          nameClean: "cooked bacon",
          measures: {
            metric: {
              amount: 8,
              unitShort: "slice",
            },
          },
        },
        {
          nameClean: "feta cheese",
          measures: {
            metric: {
              amount: 118.294,
              unitShort: "ml",
            },
          },
        },
        {
          nameClean: "olive oil",
          measures: {
            metric: {
              amount: 6,
              unitShort: "servings",
            },
          },
        },
        {
          nameClean: "salt and pepper",
          measures: {
            metric: {
              amount: 6,
              unitShort: "servings",
            },
          },
        },
      ],
    },
    {
      id: "649495",
      title: "Lemon and Garlic Slow Roasted Chicken",
      readyInMinutes: 45,
      servings: 6,
      sourceUrl:
          "http://www.foodista.com/recipe/TSSQGG2V/lemon-and-garlic-slow-roasted-chicken",
      spoonacularSourceUrl:
          "https://spoonacular.com/lemon-and-garlic-slow-roasted-chicken-649495",
      image: "https://spoonacular.com/recipeImages/649495-556x370.jpg",
      summary:
          'This recipe serves 6 and costs 28 cents per serving. One serving contains <b>74 calories</b>, <b>0g of protein</b>, and <b>7g of fat</b>. Not a lot of people made this recipe, and 1 would say it hit the spot. A mixture of salt and pepper, sunflower oil, lemons, and a handful of other ingredients are all it takes to make this recipe so delicious. It is a good option if you\'re following a <b>gluten free, dairy free, and whole 30</b> diet. From preparation to the plate, this recipe takes approximately <b>45 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 38%</b>. This score is not so super. Try <a href="https://spoonacular.com/recipes/slow-roasted-grappa-garlic-and-lemon-pepper-chicken-with-parsnip-fries-247670">Slow Roasted Grappa Garlic and Lemon Pepper Chicken with Parsnip Fries</a>, <a href="https://spoonacular.com/recipes/slow-roasted-boneless-leg-of-lamb-with-garlic-rosemary-and-lemon-157753">Slow-Roasted Boneless Leg of Lamb With Garlic, Rosemary, and Lemon</a>, and <a href="https://spoonacular.com/recipes/slow-roasted-salmon-with-garlic-dill-parsley-tarragon-and-lemon-497299">Slow Roasted Salmon with Garlic, Dill, Parsley,Tarragon and Lemon</a> for similar recipes.',
      cuisines: [],
      instructions:
          "<ol><li>2 X 300g packets mushroom or italian style stir fry or stir fry vegetables of your own choice finely shredded</li><li>Aga equipment:small roasting tin on third set of runners in roasting oventhen second set of runners in simmering oven</li><li>Trim the leg tips and wing tips from the chicken and remove any excess fat from the neck of the bird (keep the chicken fat if you are likely to make a confit in the next few days).</li><li>Season the chicken inside and out.</li><li>Separate the garlic into cloves but do not bother to peel them.</li><li>Place about two thirds of the cloves inside the chicken and the rest in the bottom of the roasting tin sitting the chicken on top of them.</li><li>Pare the zest from the lemons and cover it in plastic wrap for later use as a garnish.</li><li>Rub the juice into the chicken inside and out then rub the olive oil over the breast.</li><li>Roast the chicken quickly for 30 minutes then transfer it to the simmering ovenand cook for at least 4 hours.</li><li>Stand for 10 to 15 minutes before carving or if you have left the chicken for six hours or more pulling the joints apart for serving.</li><li>Heat a wok or large frying pan for 5 minutes on the floor of the roasting ovenwhile the chicken is standing. Transfer the wok to the boiling plateand add the sunflower oil.</li><li>Stir fry the vegetables in the oil for 3 to 4 minutes then serve the chicken on the vegetables or mixed in with them if the meat has fallen off the bone.</li><li>I often cook chicken with lemon and tarragon but the flavour of this pungent herb is lost if the cooking period is too long. So for slow aga roasting I use a mixture of lemon and garlic.</li><li>Serves 6</li></ol>",
      analyzedInstructions: [
        {
          steps: [
            {
              number: 1,
              step: "2 X 300g packets mushroom or italian style stir fry or stir fry vegetables of your own choice finely shredded",
              equipment: [],
            },
            {
              number: 2,
              step: "Aga equipment:small roasting tin on third set of runners in roasting oventhen second set of runners in simmering oven",
              equipment: [
                {
                  name: "oven",
                },
              ],
            },
            {
              number: 3,
              step: "Trim the leg tips and wing tips from the chicken and remove any excess fat from the neck of the bird (keep the chicken fat if you are likely to make a confit in the next few days).Season the chicken inside and out.Separate the garlic into cloves but do not bother to peel them.",
              equipment: [],
            },
            {
              number: 4,
              step: "Place about two thirds of the cloves inside the chicken and the rest in the bottom of the roasting tin sitting the chicken on top of them.Pare the zest from the lemons and cover it in plastic wrap for later use as a garnish.Rub the juice into the chicken inside and out then rub the olive oil over the breast.Roast the chicken quickly for 30 minutes then transfer it to the simmering ovenand cook for at least 4 hours.Stand for 10 to 15 minutes before carving or if you have left the chicken for six hours or more pulling the joints apart for serving.",
              equipment: [
                {
                  name: "plastic wrap",
                },
              ],
            },
            {
              number: 5,
              step: "Heat a wok or large frying pan for 5 minutes on the floor of the roasting ovenwhile the chicken is standing.",
              equipment: [
                {
                  name: "frying pan",
                },
                {
                  name: "wok",
                },
              ],
            },
            {
              number: 6,
              step: "Transfer the wok to the boiling plateand add the sunflower oil.Stir fry the vegetables in the oil for 3 to 4 minutes then serve the chicken on the vegetables or mixed in with them if the meat has fallen off the bone.I often cook chicken with lemon and tarragon but the flavour of this pungent herb is lost if the cooking period is too long. So for slow aga roasting I use a mixture of lemon and garlic.",
              equipment: [
                {
                  name: "wok",
                },
              ],
            },
            {
              number: 7,
              step: "Serves 6",
              equipment: [],
            },
          ],
        },
      ],
      extendedIngredients: [
        {
          nameClean: "whole chicken",
          measures: {
            metric: {
              amount: 1,
              unitShort: "large",
            },
          },
        },
        {
          nameClean: "garlic",
          measures: {
            metric: {
              amount: 2,
              unitShort: "",
            },
          },
        },
        {
          nameClean: "lemon",
          measures: {
            metric: {
              amount: 2,
              unitShort: "large",
            },
          },
        },
        {
          nameClean: "olive oil",
          measures: {
            metric: {
              amount: 1,
              unitShort: "Tbsp",
            },
          },
        },
        {
          nameClean: "salt and pepper",
          measures: {
            metric: {
              amount: 1,
              unitShort: "",
            },
          },
        },
        {
          nameClean: "sunflower oil",
          measures: {
            metric: {
              amount: 2,
              unitShort: "Tbsps",
            },
          },
        },
      ],
    },
    {
      id: "715525",
      title: "Slow Cooker Rosemary Whole Chicken",
      readyInMinutes: 45,
      servings: 3,
      sourceUrl: "http://www.pinkwhen.com/slow-cooker-rosemary-whole-chicken/",
      spoonacularSourceUrl:
          "https://spoonacular.com/slow-cooker-rosemary-whole-chicken-715525",
      image: "https://spoonacular.com/recipeImages/715525-556x370.jpg",
      summary:
          'Slow Cooker Rosemary Whole Chicken might be just the main course you are searching for. Watching your figure? This caveman, gluten free, dairy free, and primal recipe has <b>660 calories</b>, <b>55g of protein</b>, and <b>44g of fat</b> per serving. For <b>$2.38 per serving</b>, this recipe <b>covers 26%</b> of your daily requirements of vitamins and minerals. Head to the store and pick up rosemary, lemons, onion, and a few other things to make it today. To use up the onion you could follow this main course with the <a href="https://spoonacular.com/recipes/candy-corn-cupcakes-63881">Candy Corn Cupcakes</a> as a dessert. 991 person have made this recipe and would make it again. From preparation to the plate, this recipe takes roughly <b>45 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 87%</b>. This score is spectacular. Try <a href="https://spoonacular.com/recipes/rosemary-slow-cooker-chicken-235329">Rosemary Slow-Cooker Chicken</a>, <a href="https://spoonacular.com/recipes/slow-cooker-rosemary-chicken-525583">Slow Cooker Rosemary Chicken</a>, and <a href="https://spoonacular.com/recipes/slow-cooker-lemon-and-rosemary-whole-chicken-542297">Slow Cooker Lemon and Rosemary Whole Chicken</a> for similar recipes.',
      cuisines: [],
      analyzedInstructions: [],
      extendedIngredients: [
        {
          nameClean: "fresh rosemary",
          measures: {
            metric: {
              amount: 1,
              unitShort: "pkg",
            },
          },
        },
        {
          nameClean: "lemon",
          measures: {
            metric: {
              amount: 2,
              unitShort: "large",
            },
          },
        },
        {
          nameClean: "onion",
          measures: {
            metric: {
              amount: 1,
              unitShort: "medium",
            },
          },
        },
        {
          nameClean: "water",
          measures: {
            metric: {
              amount: 236.588,
              unitShort: "ml",
            },
          },
        },
        {
          nameClean: "whole chicken",
          measures: {
            metric: {
              amount: 1.814,
              unitShort: "kgs",
            },
          },
        },
      ],
    },
    {
      id: "716342",
      title: "Chicken Suya",
      readyInMinutes: 45,
      servings: 1,
      sourceUrl: "http://www.afrolems.com/2014/05/27/chicken-suya/",
      spoonacularSourceUrl: "https://spoonacular.com/chicken-suya-716342",
      image: "https://spoonacular.com/recipeImages/716342-556x370.jpg",
      summary:
          'Chicken Suya might be just the main course you are searching for. This recipe serves 1 and costs $3.22 per serving. Watching your figure? This gluten free, dairy free, and whole 30 recipe has <b>1070 calories</b>, <b>87g of protein</b>, and <b>71g of fat</b> per serving. If you have chicken, salt, cooking spoon groundnut oil, and a few other ingredients on hand, you can make it. To use up the onions you could follow this main course with the <a href="https://spoonacular.com/recipes/candy-corn-cupcakes-63881">Candy Corn Cupcakes</a> as a dessert. This recipe from Afrolems has 56 fans. From preparation to the plate, this recipe takes approximately <b>45 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 94%</b>. This score is tremendous. Try <a href="https://spoonacular.com/recipes/suya-nigerian-chicken-skewers-113497">Suya (Nigerian Chicken Skewers)</a>, <a href="https://spoonacular.com/recipes/suya-swordfish-6571">Suya Swordfish</a>, and <a href="https://spoonacular.com/recipes/i-aint-chicken-chicken-crispy-roasted-chicken-breasts-with-orange-and-cardamom-310658">I Ain\'t Chicken Chicken: Crispy Roasted Chicken Breasts with Orange and Cardamom</a> for similar recipes.',
      cuisines: [],
      instructions:
          "Heat the oven to 500 F.Wash and season the chicken with the Suya spice, chilli powder, seasoning cubes, salt and drizzle the oil over it.Place the chicken in the oven and grill for 40 minutes. Check the chicken occasionally and flip on both sides so it can cook properly.Serve hot garnished with the onions and tomato and a bit of suya spice sprinkled over the chicken.",
      analyzedInstructions: [
        {
          steps: [
            {
              number: 1,
              step: "Heat the oven to 500 F.Wash and season the chicken with the Suya spice, chilli powder, seasoning cubes, salt and drizzle the oil over it.",
              equipment: [
                {
                  name: "oven",
                },
              ],
            },
            {
              number: 2,
              step: "Place the chicken in the oven and grill for 40 minutes. Check the chicken occasionally and flip on both sides so it can cook properly.",
              equipment: [
                {
                  name: "grill",
                },
                {
                  name: "oven",
                },
              ],
            },
            {
              number: 3,
              step: "Serve hot garnished with the onions and tomato and a bit of suya spice sprinkled over the chicken.",
              equipment: [],
            },
          ],
        },
      ],
      extendedIngredients: [
        {
          nameClean: "dry seasoning rub",
          measures: {
            metric: {
              amount: 1.5,
              unitShort: "Tbsps",
            },
          },
        },
        {
          nameClean: "whole chicken",
          measures: {
            metric: {
              amount: 453.592,
              unitShort: "g",
            },
          },
        },
        {
          nameClean: "chili powder",
          measures: {
            metric: {
              amount: 1,
              unitShort: "tsp",
            },
          },
        },
        {
          nameClean: "cooking oil",
          measures: {
            metric: {
              amount: 1,
              unitShort: "",
            },
          },
        },
        {
          nameClean: "ice",
          measures: {
            metric: {
              amount: 1,
              unitShort: "cubes",
            },
          },
        },
        {
          nameClean: "onion",
          measures: {
            metric: {
              amount: 1,
              unitShort: "serving",
            },
          },
        },
        {
          nameClean: "table salt",
          measures: {
            metric: {
              amount: 1,
              unitShort: "serving",
            },
          },
        },
      ],
    },
    {
      id: "641901",
      title: "Easy Chicken Pot Pie",
      readyInMinutes: 45,
      servings: 6,
      sourceUrl: "https://www.foodista.com/recipe/M4FWCSF4/pot-pie",
      spoonacularSourceUrl:
          "https://spoonacular.com/easy-chicken-pot-pie-641901",
      image: "https://spoonacular.com/recipeImages/641901-556x370.jpg",
      summary:
          'Easy Chicken Pot Pie could be just the <b>dairy free</b> recipe you\'ve been looking for. One serving contains <b>177 calories</b>, <b>5g of protein</b>, and <b>6g of fat</b>. This recipe serves 6. For <b>58 cents per serving</b>, this recipe <b>covers 10%</b> of your daily requirements of vitamins and minerals. This recipe is liked by 1 foodies and cooks. It is brought to you by Foodista. A mixture of boned chicken, water, cream of chicken, and a handful of other ingredients are all it takes to make this recipe so delicious. From preparation to the plate, this recipe takes around <b>around 45 minutes</b>. Overall, this recipe earns a <b>good spoonacular score of 54%</b>. <a href="https://spoonacular.com/recipes/easy-chicken-pot-pie-591055">Easy Chicken Pot Pie</a>, <a href="https://spoonacular.com/recipes/easy-chicken-pot-pie-519078">Easy Chicken Pot Pie</a>, and <a href="https://spoonacular.com/recipes/easy-chicken-pot-pie-968059">Easy Chicken Pot Pie</a> are very similar to this recipe.',
      cuisines: [],
      instructions:
          "Mix first 3 ingredients and pour into a greased baking dish. Mix Bisquick with water, pour over first mixture and bake in a 400 degree oven for 45 to 50 minutes. (You may use left over chicken or turkey.)",
      analyzedInstructions: [
        {
          steps: [
            {
              number: 1,
              step: "Mix first 3 ingredients and pour into a greased baking dish.",
              equipment: [
                {
                  name: "baking pan",
                },
              ],
            },
            {
              number: 2,
              step: "Mix Bisquick with water, pour over first mixture and bake in a 400 degree oven for 45 to 50 minutes. (You may use left over chicken or turkey.)",
              equipment: [
                {
                  name: "oven",
                },
              ],
            },
          ],
        },
      ],
      extendedIngredients: [
        {
          nameClean: "whole chicken",
          measures: {
            metric: {
              amount: 1,
              unitShort: "can",
            },
          },
        },
        {
          nameClean: "mixed vegetables",
          measures: {
            metric: {
              amount: 1,
              unitShort: "can",
            },
          },
        },
        {
          nameClean: "condensed cream of chicken soup",
          measures: {
            metric: {
              amount: 1,
              unitShort: "can",
            },
          },
        },
        {
          nameClean: "baking mix",
          measures: {
            metric: {
              amount: 236.588,
              unitShort: "ml",
            },
          },
        },
        {
          nameClean: "water",
          measures: {
            metric: {
              amount: 236.588,
              unitShort: "ml",
            },
          },
        },
      ],
    },
    {
      id: "660220",
      title: "Skillet Roasted Chicken & Potatoes",
      readyInMinutes: 45,
      servings: 4,
      sourceUrl:
          "https://www.foodista.com/recipe/BCC472YG/skillet-roasted-chicken-potatoes",
      spoonacularSourceUrl:
          "https://spoonacular.com/skillet-roasted-chicken-potatoes-660220",
      image: "https://spoonacular.com/recipeImages/660220-556x370.jpg",
      summary:
          'Skillet Roasted Chicken & Potatoes is a <b>gluten free, dairy free, fodmap friendly, and whole 30</b> main course. This recipe makes 4 servings with <b>695 calories</b>, <b>46g of protein</b>, and <b>44g of fat</b> each. For <b>$2.09 per serving</b>, this recipe <b>covers 32%</b> of your daily requirements of vitamins and minerals. From preparation to the plate, this recipe takes about <b>about 45 minutes</b>. 1 person has made this recipe and would make it again. A mixture of olive oil, chicken, paprika, and a handful of other ingredients are all it takes to make this recipe so flavorful. It is brought to you by Foodista. Overall, this recipe earns a <b>good spoonacular score of 74%</b>. <a href="https://spoonacular.com/recipes/skillet-roasted-lemon-chicken-with-potatoes-379094">Skillet-Roasted Lemon Chicken with Potatoes</a>, <a href="https://spoonacular.com/recipes/skillet-roasted-whole-chicken-with-lemon-and-potatoes-611209">Skillet-Roasted Whole Chicken with Lemon and Potatoes</a>, and <a href="https://spoonacular.com/recipes/skillet-chicken-with-roasted-potatoes-and-carrots-707724">Skillet Chicken with Roasted Potatoes and Carrots</a> are very similar to this recipe.',
      cuisines: [],
      instructions:
          "Adjust oven rack to lower-middle position and preheat oven to 400 degrees f. In a small bowl combine 2 T. olive oil, thyme, smoked paprika, 1 t. salt and 1/2 t. pepper. Carefully run your fingers under the skin covering the chicken breast, separating the skin from the meat. Rub the oil mixture all over the chicken, spooning some under the skin covering the breast. Tie the legs together with butchers twine and tuck the wings behind the back.\nToss the sliced potatoes with the remaining tablespoon of oil, 3/4 t. salt and 1/2 t. pepper. Arrange the potatoes in a 12-inch nonstick, oven-safe skillet (see note above). Place the skillet over medium heat and cook, without flipping or stirring until the potatoes are golden-brown on the bottoms, about 7-9 minutes. Then place the prepared chicken, breast-side up on top of the potatoes. Transfer the skillet to the oven and roast until a thermometer inserted in several places has reached 165 degrees (about 1-1 1/4 hours). Transfer the chicken to a serving platter and cover loosely with foil, let rest for 20 minutes.\nMeanwhile, cover the skillet with the potatoes, add back to the oven and roast for an additional 20 minutes, until the potatoes are very tender. Carve the chicken and serve along side the roasted potatoes (and prepared to be wowed!).",
      analyzedInstructions: [
        {
          steps: [
            {
              number: 1,
              step: "Adjust oven rack to lower-middle position and preheat oven to 400 degrees f. In a small bowl combine 2 T. olive oil, thyme, smoked paprika, 1 t. salt and 1/2 t. pepper. Carefully run your fingers under the skin covering the chicken breast, separating the skin from the meat. Rub the oil mixture all over the chicken, spooning some under the skin covering the breast. Tie the legs together with butchers twine and tuck the wings behind the back.",
              equipment: [
                {
                  name: "kitchen twine",
                },
                {
                  name: "bowl",
                },
                {
                  name: "oven",
                },
              ],
            },
            {
              number: 2,
              step: "Toss the sliced potatoes with the remaining tablespoon of oil, 3/4 t. salt and 1/2 t. pepper. Arrange the potatoes in a 12-inch nonstick, oven-safe skillet (see note above).",
              equipment: [
                {
                  name: "frying pan",
                },
                {
                  name: "oven",
                },
              ],
            },
            {
              number: 3,
              step: "Place the skillet over medium heat and cook, without flipping or stirring until the potatoes are golden-brown on the bottoms, about 7-9 minutes. Then place the prepared chicken, breast-side up on top of the potatoes.",
              equipment: [
                {
                  name: "frying pan",
                },
              ],
            },
            {
              number: 4,
              step: "Transfer the skillet to the oven and roast until a thermometer inserted in several places has reached 165 degrees (about 1-1 1/4 hours).",
              equipment: [
                {
                  name: "kitchen thermometer",
                },
                {
                  name: "frying pan",
                },
                {
                  name: "oven",
                },
              ],
            },
            {
              number: 5,
              step: "Transfer the chicken to a serving platter and cover loosely with foil, let rest for 20 minutes.",
              equipment: [
                {
                  name: "aluminum foil",
                },
              ],
            },
            {
              number: 6,
              step: "Meanwhile, cover the skillet with the potatoes, add back to the oven and roast for an additional 20 minutes, until the potatoes are very tender. Carve the chicken and serve along side the roasted potatoes (and prepared to be wowed!).",
              equipment: [
                {
                  name: "frying pan",
                },
                {
                  name: "oven",
                },
              ],
            },
          ],
        },
      ],
      extendedIngredients: [
        {
          nameClean: "olive oil",
          measures: {
            metric: {
              amount: 3,
              unitShort: "Tbsps",
            },
          },
        },
        {
          nameClean: "thyme",
          measures: {
            metric: {
              amount: 2,
              unitShort: "tsps",
            },
          },
        },
        {
          nameClean: "smoked paprika",
          measures: {
            metric: {
              amount: 1.5,
              unitShort: "tsps",
            },
          },
        },
        {
          nameClean: "salt and pepper",
          measures: {
            metric: {
              amount: 1,
              unitShort: "serving",
            },
          },
        },
        {
          nameClean: "whole chicken",
          measures: {
            metric: {
              amount: 1.814,
              unitShort: "kgs",
            },
          },
        },
        {
          nameClean: "yukon gold potato",
          measures: {
            metric: {
              amount: 907.185,
              unitShort: "g",
            },
          },
        },
      ],
    },
    {
      id: "645879",
      title: "Grilled Sesame Chicken",
      readyInMinutes: 45,
      servings: 1,
      sourceUrl:
          "http://www.foodista.com/recipe/24CNXQ2K/grilled-sesame-chicken",
      spoonacularSourceUrl:
          "https://spoonacular.com/grilled-sesame-chicken-645879",
      image: "https://spoonacular.com/recipeImages/645879-556x370.jpg",
      summary:
          'For <b>$2.04 per serving</b>, this recipe <b>covers 5%</b> of your daily requirements of vitamins and minerals. One serving contains <b>506 calories</b>, <b>5g of protein</b>, and <b>20g of fat</b>. 1 person has made this recipe and would make it again. It is perfect for <b>The Fourth Of July</b>. From preparation to the plate, this recipe takes about <b>45 minutes</b>. It is a good option if you\'re following a <b>gluten free and dairy free</b> diet. A mixture of sesame oil, honey, soy sauce, and a handful of other ingredients are all it takes to make this recipe so yummy. All things considered, we decided this recipe <b>deserves a spoonacular score of 68%</b>. This score is pretty good. Try <a href="https://spoonacular.com/recipes/grilled-sesame-chicken-398042">Grilled Sesame Chicken</a>, <a href="https://spoonacular.com/recipes/grilled-sesame-ginger-chicken-165031">Grilled Sesame-Ginger Chicken</a>, and <a href="https://spoonacular.com/recipes/sesame-grilled-chicken-veggies-267429">Sesame Grilled Chicken & Veggies</a> for similar recipes.',
      cuisines: [],
      instructions:
          "<ol><li>Wipe dry the chicken.</li><li>Season with salt and pepper.</li><li>Mix marinade together and rub onto chicken.</li><li>Preheat grill and when hot, place chicken under it.</li><li>If you do not have a grill, roast it in your oven.</li><li>Cook till golden brown, turning chicken over once and basting it with marinade occasionally.</li></ol>",
      analyzedInstructions: [
        {
          steps: [
            {
              number: 1,
              step: "Wipe dry the chicken.Season with salt and pepper.",
              equipment: [],
            },
            {
              number: 2,
              step: "Mix marinade together and rub onto chicken.Preheat grill and when hot, place chicken under it.If you do not have a grill, roast it in your oven.Cook till golden brown, turning chicken over once and basting it with marinade occasionally.",
              equipment: [
                {
                  name: "grill",
                },
                {
                  name: "oven",
                },
              ],
            },
          ],
        },
      ],
      extendedIngredients: [
        {
          nameClean: "whole chicken",
          measures: {
            metric: {
              amount: 1,
              unitShort: "",
            },
          },
        },
        {
          nameClean: "honey",
          measures: {
            metric: {
              amount: 59.147,
              unitShort: "ml",
            },
          },
        },
        {
          nameClean: "honey",
          measures: {
            metric: {
              amount: 2,
              unitShort: "tsps",
            },
          },
        },
        {
          nameClean: "salt and pepper",
          measures: {
            metric: {
              amount: 1,
              unitShort: "serving",
            },
          },
        },
        {
          nameClean: "sesame oil",
          measures: {
            metric: {
              amount: 1,
              unitShort: "Tbsp",
            },
          },
        },
        {
          nameClean: "sesame oil",
          measures: {
            metric: {
              amount: 1,
              unitShort: "tsp",
            },
          },
        },
        {
          nameClean: "sesame seeds",
          measures: {
            metric: {
              amount: 2,
              unitShort: "tsps",
            },
          },
        },
        {
          nameClean: "soy sauce",
          measures: {
            metric: {
              amount: 1,
              unitShort: "Tbsp",
            },
          },
        },
        {
          nameClean: "soy sauce",
          measures: {
            metric: {
              amount: 1,
              unitShort: "Tbsp",
            },
          },
        },
      ],
    },
    {
      id: "636411",
      title: "Buffalo Chicken Wings Wonton Wraps",
      readyInMinutes: 45,
      servings: 20,
      sourceUrl:
          "https://www.foodista.com/recipe/6LDTLRRB/buffalo-chicken-wings-wonton-wraps",
      spoonacularSourceUrl:
          "https://spoonacular.com/buffalo-chicken-wings-wonton-wraps-636411",
      image: "https://spoonacular.com/recipeImages/636411-556x370.jpg",
      summary:
          'Buffalo Chicken Wings Wonton Wraps might be just the hor d\'oeuvre you are searching for. One portion of this dish contains roughly <b>2g of protein</b>, <b>1g of fat</b>, and a total of <b>39 calories</b>. This recipe serves 20 and costs 13 cents per serving. 5 people have tried and liked this recipe. It is perfect for <b>The Super Bowl</b>. Head to the store and pick up wonton wrappers, hot sauce, weight cheddar cheese, and a few other things to make it today. Not a lot of people really liked this Chinese dish. It is brought to you by Foodista. From preparation to the plate, this recipe takes around <b>around 45 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 7%</b>. This score is very bad (but still fixable). Similar recipes include <a href="https://spoonacular.com/recipes/skinny-buffalo-chicken-wonton-cups-629647">Skinny Buffalo Chicken Wonton Cups</a>, <a href="https://spoonacular.com/recipes/veggie-pizza-and-buffalo-chicken-salad-wonton-cup-appetizers-511906">Veggie Pizzan and Buffalo Chicken Salad Wonton Cup Appetizers</a>, and <a href="https://spoonacular.com/recipes/buffalo-chicken-wings-165207">Buffalo Chicken Wings</a>.',
      cuisines: ["Chinese", "Asian"],
      instructions:
          "Preheat oven to 350 degrees\nLine a baking sheet with parchment paper.\nCut your chicken into tiny pieces, as small as you can get it.\nIn a medium bowl add chicken, cream cheese, cheddar cheese and hot sauce. Mix together until well blended.\nIn a tiny bowl, add some water. This is for sealing the edges of your wontons.\nPlace 1 1/2 tsp. of mixture in won-ton wrapper, take your finger and dip in water and place along the edges of the wrapper (this will be the glue to seal the wrappers together). Fold wrapper over into triangle place on baking sheet, Do the same for the rest of the wrappers. Bake in over for 15 minutes, until lightly brown.\nServe with Light Blue Cheese or Ranch Dressing on the side.",
      analyzedInstructions: [
        {
          steps: [
            {
              number: 1,
              step: "Preheat oven to 350 degrees",
              equipment: [
                {
                  name: "oven",
                },
              ],
            },
            {
              number: 2,
              step: "Line a baking sheet with parchment paper.",
              equipment: [
                {
                  name: "baking paper",
                },
                {
                  name: "baking sheet",
                },
              ],
            },
            {
              number: 3,
              step: "Cut your chicken into tiny pieces, as small as you can get it.",
              equipment: [],
            },
            {
              number: 4,
              step: "In a medium bowl add chicken, cream cheese, cheddar cheese and hot sauce.",
              equipment: [
                {
                  name: "bowl",
                },
              ],
            },
            {
              number: 5,
              step: "Mix together until well blended.",
              equipment: [],
            },
            {
              number: 6,
              step: "In a tiny bowl, add some water. This is for sealing the edges of your wontons.",
              equipment: [
                {
                  name: "bowl",
                },
              ],
            },
            {
              number: 7,
              step: "Place 1 1/2 tsp. of mixture in won-ton wrapper, take your finger and dip in water and place along the edges of the wrapper (this will be the glue to seal the wrappers together). Fold wrapper over into triangle place on baking sheet, Do the same for the rest of the wrappers.",
              equipment: [
                {
                  name: "baking sheet",
                },
              ],
            },
            {
              number: 8,
              step: "Bake in over for 15 minutes, until lightly brown.",
              equipment: [
                {
                  name: "oven",
                },
              ],
            },
            {
              number: 9,
              step: "Serve with Light Blue Cheese or Ranch Dressing on the side.",
              equipment: [],
            },
          ],
        },
      ],
      extendedIngredients: [
        {
          nameClean: "whole chicken",
          measures: {
            metric: {
              amount: 113.398,
              unitShort: "g",
            },
          },
        },
        {
          nameClean: "cream cheese",
          measures: {
            metric: {
              amount: 28.35,
              unitShort: "g",
            },
          },
        },
        {
          nameClean: "cheddar cheese",
          measures: {
            metric: {
              amount: 28.35,
              unitShort: "g",
            },
          },
        },
        {
          nameClean: "hot sauce",
          measures: {
            metric: {
              amount: 59.147,
              unitShort: "ml",
            },
          },
        },
        {
          nameClean: "wonton wrappers",
          measures: {
            metric: {
              amount: 20,
              unitShort: "",
            },
          },
        },
      ],
    },
  ];

  const url = "http://localhost:5007/recipes";

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

      .then((response) => {
        return response.json();
      })

      .then((data) => {
        let recipes = data;
        console.log(recipes);
        for (let i = 0; i < recipes.length; i++) {
          // Hämtar element med id "recipecontainer", lägger till ett cardTemplate i slutet
          document
              .querySelector("#recipeContainer")
              .insertAdjacentHTML("beforeend", cardTemplate);

          summary = recipes[i].summary;
          finalSummary = summary.substring(0, summary.lastIndexOf(". "));

          // Ändrar id på "recipeName" och "recipeDescription"
          $("#recipeName").attr("id", "recipeName" + i);
          $("#recipeDescription").attr("id", "recipeDescription" + i);
          $("#recipeImg").attr("id", "recipeImg" + i);
          $("#cookTime").attr("id", "cookTime" + i);

          // Lägger till information från objektet i varje kort
          $("#recipeName" + i).text(recipes[i].title);
          $("#recipeDescription" + i).html(finalSummary + ".");
          $("#recipeImg" + i).attr("src", recipes[i].image);
          $("#cookTime" + i).text("Total cook time: " + recipes[i].readyInMinutes + " minutes");
        }
        ;
        $(".sss").on("click", function () {
          localStorage.removeItem("recipeObj");
          // When a button is clicked...
          var spotify = $(".sss").index(this);
          localStorage.setItem("recipeObj", JSON.stringify(recipes[spotify])); // Save the id to local storage
        });

        $(".bbb").on("click", function () {
          localStorage.removeItem("recipeObj");
          // When a button is clicked...
          var recipe = $(".bbb").index(this);
          localStorage.setItem("recipeObj", JSON.stringify(recipes[recipe])); // Save the id to local storage
        });
      })

.
  catch(function () {

  })
})
