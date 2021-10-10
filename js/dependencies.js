var dependencies = [
        "./js/api.js",
        "./js/components/dropdown.js",
        "./js/components/flag.js",
        "./js/components/btn_pop.js",
        "./js/components/btn_close.js",
        "./js/components/modal.js",
        "./js/components/section.js",
        "./js/components/categories.js"
]

var import_script = function (dependencie) {
    var script_tag = document.createElement('script');
    script_tag.setAttribute('type', "text/javascript");
    script_tag.setAttribute('src', dependencie);
    return script_tag
}

var initDependencies = function(main) {
    for (var i in dependencies) {
        var dependencie = dependencies[(dependencies.length -1)  - i];
        script_tag = import_script(dependencie);
        var before = document.body.querySelector('script')
        document.body.insertBefore(script_tag, before);
        if(i == dependencies.length -1) {
            script_tag.onload = main;
            script_tag.onreadystatechange = main;
        }
        
    }
    return 0;
}
