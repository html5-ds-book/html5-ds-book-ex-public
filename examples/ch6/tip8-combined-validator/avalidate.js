;(function($) {

    function createDelayed(ms) {
        var t = null;
        return function(fn) {
            if (t) clearTimeout(t);
            t = setTimeout(fn, ms);
        };
    }

    function showError(error, strings) {
        var tmpl;
        if (!error.attr('data-v-template')) {
            tmpl = error.text().toString();
            error.attr('data-v-template', tmpl);
        } else tmpl = error.attr('data-v-template');
        for (var key in strings) 
            tmpl = tmpl.replace('{'+key+'}', strings[key]);
        error.text(tmpl).show();
    }


    function elementVerifier() {
        var isValid = true, waiting = 0, field = this;
        $.each(this.attributes, function(i, attr) {
            if (!attr.name.match(/data-v-/)) return;
            var plugin = attr.name.toString().replace('data-v-',''),
            options = attr.value;

            ++waiting;
            $.avalidate[plugin].call(field, options, function (valid, strings) {
                var error = $(field).parent().find('[data-v-error="'+plugin+'"]');
                if (!valid) {
                    showError(error, strings); 
                    isValid = false;
                } 
                else error.hide();
                if (!--waiting && isValid) 
                    $(field).attr('data-valid', 1);
            });
        });
    }

    function setupFormVerifier(form) {
        form.on('change keyup mouseup', 'input,textarea,select', function() {
            var $this = $(this)
            var delayer = $this.data('avalidate');
            if (!delayer) { 
                delayer = createDelayed(800); 
                $this.data('avalidate', delayer);
            }
            $this.attr('data-valid', 0);
            delayer(elementVerifier.bind(this));
        }).on('submit', function(e) {
            var all = $(this).find('input,textarea,select').filter('[type!="submit"]'),
            valid = all.filter('[data-valid="1"]');
            if (all.length != valid.length)
                e.preventDefault();
        });
    }

    $(function() {
        $('body').on('submit change keyup mouseup', 'form[data-avalidate]', function() {
            if (!$(this).attr('data-avalidate-enabled')) {
                setupFormVerifier($(this));
                $(this).attr('data-avalidate-enabled', 1)
            }
        });
    });

}(jQuery));

