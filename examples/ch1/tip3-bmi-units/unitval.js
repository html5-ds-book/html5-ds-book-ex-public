(function() {
    var Factors = {};
    var Convert = window.Convert = {
        fromInput: function(measurement, valunits, unit) {
            valunits = unit ? [[valunits, unit]] // 3 arguments
                : valunits instanceof Array && valunits[0] instanceof Array ? valunits  // array of arrays
                : [valunits]; // [val, unit] array
            var sivalues = valunits.map(function(valunit) { // convert each to SI
                return valunit[0] * Factors[measurement][valunit[1]];
            });
            // sivalues.sum()
            return sivalues.reduce(function(a, e) { return a + e; }); 
        },
        toOutput: function(measurement, val, units, round) {
            units = units instanceof Array ? units : [units];
            var reduced = val;
            return units.map(function(unit, index) {
                var isLast = index == units.length - 1,
                    factor = Factors[measurement][unit];
                var showValue = reduced / factor;
                if (isLast && typeof(round) != 'undefined') 
                    showValue = showValue.toFixed(round) - 0;
                else if (!isLast) showValue = Math.floor(showValue);
                reduced -= showValue * factor;
                return showValue;
            });
        }
    };
    $.unitval = function(fac) {
        Factors = fac;
    }

    // Uses .val() in input/textarea and .text() in other fields.
    var uval = function() { 
        return ['input','textarea'].indexOf(this[0].tagName.toLowerCase()) < 0 ?
                this.text.apply(this, arguments) : this.val.apply(this, arguments);
    }

    // Sets the measurement units within a specific element.
    // @param measurements An array in the format [{type:"measurement", units: ["unit", ...], round:N}]
    // for example [{type:"height", units:["ft","inch"], round:0}]
    var setMeasurementUnits = function(measurements) {
        var $this = this;
        measurements.forEach(function(measurement) {
            var holders = $this.find('[data-measurement="'+measurement.type+'"]');
            var unconverted = holders.map(function() { return $(this).unitval(); })
            holders.attr('data-round', measurement.round);
            holders.find('[data-value-display]').each(function(index) {
                if (index < measurement.units.length)    
                    $(this).show().attr('data-unit', measurement.units[index]);
                else $(this).hide();
            });
            holders.find('[data-unit-display]').each(function(index) {
                if (index < measurement.units.length)    
                    $(this).show().html(measurement.units[index]);
                else $(this).hide();
            });

            holders.each(function(index) { $(this).unitval(unconverted[index]); });
        });
    };

    // Set and get "united" values or set unit options.
    $.fn.unitval = function(value) {
        if (value instanceof Array) {
            setMeasurementUnits.apply(this, arguments);
        }
        else if (typeof(value) == 'undefined') {
            // Read value from element
            var first       = this.eq(0),
                measurement = first.attr('data-measurement'),
                displays    = first.find('[data-value-display]:visible'),
                // Get units of visible holders.
                valunits = displays.toArray().map(function(el) { return [uval.call($(el)), $(el).attr('data-unit')] });
            // Convert them from input
            return Convert.fromInput(measurement, valunits);
        } 
        else if (!isNaN(value)) {
            // Write value to elements
            this.each(function() {
                var measurement   = $(this).attr('data-measurement'),
                    round         = $(this).attr('data-round'),
                    displays      = $(this).find('[data-value-display]:visible'), // dont consider hidden ones
                    units         = displays.map(function() { return $(this).attr('data-unit'); }).toArray();
                var values        = Convert.toOutput(measurement, value, units, round);
                displays.each(function(index) { uval.call($(this), values[index]); });

            });
        }
    }


}());
