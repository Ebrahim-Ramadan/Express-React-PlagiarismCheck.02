# Express-React-PlagiarismCheck.02-APIUpdate
Express server connected to reactjs for google search &amp; certain content scrapping (puppeteer), using htmx + nodecache, solving this [challenge](https://www.codementor.io/projects/web/plagiarism-checker-website-atx32nf0oa).

<br> This is test02 for individual phrases which they will be divided from the main paragraphs in the very soon
<br>
This very modular UI shows to the user to start typing the whole text for check, submitting in ctrl+Enter after finishing. 
<br>
getting out of (unshowing) the typing-modal cancels the request with a `useEffect()'s cleanup func`:
<br>
```
  useEffect(() => {  
    if (showModal) {  
          modalRef.current.focus();  
          try{  
          await fetch()...  
          } catch (error) {  
        if (error.name === 'AbortError') {  
          console.log('Fetch request was aborted by the user.');  
          toastify('Requet Aborted')  
        } else {  
          console.error('An error occurred:', error.message);  
        }  
      }  
            const textareaElement = modalRef.current;  
      if (abortControllerRef.current) {  
        abortControllerRef.current.abort();  
      }  
return () => {  
      // Cleanup function  
      // If the component unmounts or the dependency array changes, abort the request  
      if (abortControllerRef.current) {  
        abortControllerRef.current.abort();  
      }  
    };  
    }  
```
<br>
with the main textarea
```         
<textarea type="text" ref={modalRef} placeholder="start writing" />
```
<br><br>


https://github.com/Ebrahim-Ramadan/Express-React-PlagiarismCheck.02-RESTfulAPI/assets/65041082/0695f733-5c0b-4efe-bed4-f965e7857d30

<br><br>

https://github.com/Ebrahim-Ramadan/Express-React-PlagiarismCheck.02-RESTfulAPI/assets/65041082/8a189f1f-35da-42e5-ad5c-3b4043e3b3bd

<br><br>
### Client dir.
<br>

#### Features:
<br>
-- AbortController to update the request state in case o cancelling the requet by the user (out of the typing-modal) <br>
-- hovering over the ` @Ebrahim Ramadan ` for a little shows this modal of me for [My Github Overview](https://github.com/ebrahim-Ramadan/). and clicking on it takes you to [My Twitter](https://twitter.com/scoopsahoykid).

<br>
![Screenshot 2023-07-26 152600](https://github.com/Ebrahim-Ramadan/Express-React-PlagiarismCheck.02-RESTfulAPI/assets/65041082/241539d5-1b54-4125-8d4f-25540146d089)
<br>
-- Different Errors handled very gracefully on both server and client related, check the API
