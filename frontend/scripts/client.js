
/* Localhost for development */
const URL = "http://localhost:5000/"


$.ajax(
    {
      url: URL.concat('api'),
      type: 'GET',
      success: function(result) {
        
      },
      error: function(xhr,status,error) {
        
        // log the errors and alerts that an error has occurred
        console.log(xhr);
        console.log(status);
        console.log(error);
        alert("ERROR WITH API CALL! CHECK CONSOLE");
  
      }
    }
  );
  
  