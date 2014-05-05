$(function() {
    $('body').on('change', 'select[data-value]', function() { $(this).attr('data-value', $(this).val()); });
    window.updateDropdowns = function() { 
        $('select[data-value]').each(function() {
            $(this).val($(this).attr('data-value'));
        });
    }
    updateDropdowns();
});

