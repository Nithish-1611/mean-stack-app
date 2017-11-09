(function () {
  'use strict';

  angular
    .module('items')
    .controller('ItemsListController', ItemsListController);

  ItemsListController.$inject = ['ItemsService', 'CategoriesService', 'ModulesService'];

  function ItemsListController(ItemsService, CategoriesService, ModulesService) {
    var vm = this;

    vm.items = ItemsService.query();
    vm.cats = CategoriesService.query();
  	vm.mods = ModulesService.query();

  
  }
}());
