/**
 * Created by Ruben on 1/24/14.
 */
load_menu();
$('#meal,#where').change(function(){
    load_menu();
});
function load_menu() {
    $('.menus').load('http://diningwithstrangers.co/extension/get_menu.php?meal='+$('#meal').val()+'&where='+$('#where').val());
}
