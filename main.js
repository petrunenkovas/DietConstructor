const app = Vue.createApp({
    template: 
    /*html*/
    `<nav>
        <button @click="showForm">Рассчитать дневной калораж</button>
        <button @click="createMenu">Составить меню на неделю</button>
        <button @click="showRecipes">Посмотреть список рецептов</button>
    </nav>
    <dailycalories-form @countCalories="setCalories" v-if="isShownForm" @close="closeModal"></dailycalories-form>
    <menu-constructor :menu="menu" :dailyCalories="dailyCalories" v-if="isShownMenu" @showRecipe="showRecipe"></menu-constructor>
    <recipe-dialog v-if="isShowRecipe" :recipe="recipe" @close="closeModal"></recipe-dialog>
    <recipes-page v-if="isShownRecipes"></recipes-page>`,
    data() {
        return {
            dailyCalories: 0,
            isShownForm: false,
            isShownMenu: false,
            menu: [],
            meals: ['breakfast', 'lunch', 'dinner'],
            mealsProp: [0.33, 0.38, 0.24],
            isShowRecipe: false,
            isShownRecipes: false,
            recipe:{},
        }
    },
    mounted() {
        this.dailyCalories = Number(localStorage.getItem('dailyCalories'))||0;
    },
    methods: {
        setCalories(cal) {
            this.dailyCalories = cal;
            localStorage.setItem('dailyCalories', cal);
        },
        showForm() {
            this.isShownForm = true;
        },
        showRecipes() {
            this.isShownMenu = false;
            this.isShownRecipes = true;
        },
        closeModal() {
            this.isShownForm = false;
            this.isShowRecipe = false;
        },
        showRecipe(day, meal) {
            this.recipe = this.menu[day][meal];
            console.log(this.recipe);
            this.isShowRecipe = true;
        },
        createMenu() {
            const recipesForMenu = [];
            for (recipe of recipes) {
                recipesForMenu.push({...recipe});
            }
            if (this.menu.length !== 0) {
                while (this.menu.length) {
                    this.menu.pop();
                }
            }
            for (let i = 0; i < 7; i++) {
                this.menu.push([]);
                for (let j=0; j < 3; j++) {
                    const recipesMeal = [...recipesForMenu.filter(recipe => recipe.meal === this.meals[j])];
                    let mult = 1.1;
                    const num = Math.floor(Math.random()*recipesMeal.length);
                    recipesForMenu[(recipesMeal[num].id - 1)].meal = '';
                    let mealCal = recipesMeal[num].calories*mult;
                    while (mealCal < (this.mealsProp[j]* this.dailyCalories)) {
                        mealCal = recipesMeal[num].calories*mult;
                        mult += 0.1;
                    }
                    mult -= 0.1;
                    recipesMeal[num].calories = Math.ceil(recipesMeal[num].calories*mult);
                    for (item of recipesMeal[num].ingredients) {
                        item.quantity = Math.round(item.quantity*mult);
                    }
                    this.menu[i].push(recipesMeal[num]);
                }
            }
            this.isShownRecipes = false;
            this.isShownMenu = true;
            while (recipesForMenu.length) {
                recipesForMenu.pop();
            }
        },
    },
    computed:{

    },
});
