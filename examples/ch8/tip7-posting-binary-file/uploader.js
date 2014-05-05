window.postBinary = function(url, data) {
    var self = {},
        xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.responseType = 'text';    
    self.done = function(cb) {
        xhr.addEventListener('load', function() {
            if (this.status == 200) 
                cb(null, this.response)
            else 
                cb(this.status, this.response)
        });
        return self;
    }
    self.progress = function(cb) {
        xhr.upload.addEventListener('progress', function(e) {
            if (e.lengthComputable) 
                cb(null, e.loaded / e.total);
            else
                cb('Progress not available');
        });
        return progress;
    };
    xhr.send(data);    
    return self;
};

