$(function() {
    console.log('jQuery should be loaded now...');
    let $home = $('li#home');
    let $about = $('li#about');
    let $contact = $('li#contact');
    let $project = $('li#project');

    let pathname = location.pathname.split('/')[1];

    console.log('LOCATION: ', location);
    console.log('PATHNAME: ', pathname);
    if ( pathname === "" ) {
        $home.addClass('active');
    }
    if ( pathname === "about" ) {
        $about.addClass('active');
    }
    if ( pathname === "contact" ) {
        $contact.addClass('active');
    }
    if ( pathname === "project" || pathname === "reseller" || pathname === "challenges" || pathname === "opportunities" || pathname === "reflection" ) {
        $project.addClass('active');
    }
});
