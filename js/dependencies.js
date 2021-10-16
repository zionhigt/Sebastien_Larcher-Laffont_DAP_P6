const dependencies = [
        "./js/api.js",
        "./js/components/escalator.js",
        "./js/components/dropdown.js",
        "./js/components/flag.js",
        "./js/components/btn_close.js",
        "./js/components/modal.js",
        "./js/components/films_data.js",
        "./js/components/btn_pop.js",
        "./js/components/section.js"
]

const import_script = function (dependencie) {
    const script_tag = document.createElement('script');
    script_tag.setAttribute('src', dependencie);
    return script_tag
}

const initDependencies = function(main) {
    for (let i in dependencies) {
        const dependencie = dependencies[(dependencies.length -1)  - i];
        const script_tag = import_script(dependencie);
        const before = document.body.querySelector('script')
        document.body.insertBefore(script_tag, before);
        if(i == dependencies.length -1) {
            script_tag.onload = main;
            script_tag.onreadystatechange = main;
        }
        
    }
    return 0;
}
