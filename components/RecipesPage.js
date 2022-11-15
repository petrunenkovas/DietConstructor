app.component('recipes-page', {
    template: 
    /*html*/
  `<h2>Рецепты</h2>
    <div class="filter">
        <div>
            <button :class= "{currentFilter: selectedFilter === 'breakfast lunch dinner'}" @click="selectedFilter = 'breakfast lunch dinner'">Все</button>
            <button v-for="meal in meals" :class= "{currentFilter: selectedFilter === meal.title}" @click="selectedFilter=meal.title">{{meal.name}}</button>
        </div>
    </div>
    <div class="recipes">
      <div v-for="recipe in filteredRecipes" class="recipe">
      <h3>{{ recipe.title }} <span class="calories"> {{ recipe.calories }} ккал</span></h3>
      <h5 class="recipeMeal"> <i class="fa-regular fa-clock"></i> {{ getMeal(recipe.meal) }}</h5>
      <div class="ingredients">
          <ul>
              <li v-for="ingredient in recipe.ingredients">{{ ingredient.name }} <span v-if="ingredient.quantity === 0" class="calories">{{ingredient.measure}}</span><span v-else class="calories">{{ingredient.quantity}} {{ingredient.measure}}</span></li>
          </ul>
      </div>
      <div class="instructions">
          <p v-html="recipe.recipt"></p>
      </div>
      </div>
    </div>
    `,
    data() {
        return {
            meals: [{title:'breakfast', name:'Завтрак'}, {title:'lunch', name:'Обед'}, {title:'dinner', name:'Ужин'}],
            recipesList: [...recipes],
            selectedFilter: 'breakfast lunch dinner',
        }
    },
    methods: {
        getMeal(title) {
            const currMeal = this.meals.find((meal) => meal.title === title);
            return currMeal.name;
        },
    },
    computed: {
        filteredRecipes() {
            return [...this.recipesList].filter((recipe) => this.selectedFilter.includes(recipe.meal))
        },
    },
});
