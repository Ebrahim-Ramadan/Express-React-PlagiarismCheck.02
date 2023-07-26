# Express-React-PlagiarismCheck.02-APIUpdate
Express server connected to reactjs for google search &amp; certain content scrapping (puppeteer), using htmx + nodecache
This is test02 for individual phrases which they will be divided from the main paragraphs in the very soon
<br>
This very modular UI shows to the user to start typing the whole text for check, submitting in ctrl+Enter after finishing. 
<br>
getting out of (unshowing) the typing-modal cancels the request with a `useEffect()'s cleanup func`:
<br>
`
  useEffect(() => {<br>
    if (showModal) {<br>
          modalRef.current.focus();<br>
          try{<br>
          await fetch()...<br>
          } catch (error) {<br>
        if (error.name === 'AbortError') {<br>
          console.log('Fetch request was aborted by the user.');<br>
          toastify('Requet Aborted')<br>
        } else {<br>
          console.error('An error occurred:', error.message);<br>
        }<br>
      }<br>
            const textareaElement = modalRef.current;<br>
      if (abortControllerRef.current) {<br>
        abortControllerRef.current.abort();<br>
      }<br>
return () => {<br>
      // Cleanup function<br>
      // If the component unmounts or the dependency array changes, abort the request<br>
      if (abortControllerRef.current) {<br>
        abortControllerRef.current.abort();<br>
      }<br>
    };<br>
    }<br>
`
<br>
with the main textarea 
`         <textarea type="text" ref={modalRef} placeholder="start writing" />`



https://github.com/Ebrahim-Ramadan/Express-React-PlagiarismCheck.02-RESTfulAPI/assets/65041082/0695f733-5c0b-4efe-bed4-f965e7857d30

<br><br>

https://github.com/Ebrahim-Ramadan/Express-React-PlagiarismCheck.02-RESTfulAPI/assets/65041082/8a189f1f-35da-42e5-ad5c-3b4043e3b3bd

<br><br>
### Client dir.
<br>

#### Features:
<br>
-- AbortController to update the request state in case o cancelling the requet by the user (out of the typing-modal)
