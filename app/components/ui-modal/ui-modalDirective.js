angular.module("simulados").directive("uiModal", function () {
	return {
		templateUrl: "ui-modal.html",
		replace: true,
		restrict: "AE",
		scope: {
			title: "@"
		},
		transclude: true
	};
});