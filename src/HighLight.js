import React from 'react';
import { useState } from 'react';
export function highlightHTMLContent(htmlContent, plainText, plainTextPositions) {
    let result = htmlContent;
    plainTextPositions.sort((a, b) => b.start - a.start);
  
    for (const pos of plainTextPositions) {
      const start = adjustPosition(htmlContent, pos.start);
      const end = adjustPosition(htmlContent, pos.end);
      result = result.slice(0, start) + '<mark>' + result.slice(start, end) + '</mark>' + result.slice(end);
    }
    console.log(result);
    return result;
  }
  
  function adjustPosition(htmlContent, position) {
    let count = 0;
    let inTag = false;
  
    for (let i = 0; i < htmlContent.length; i++) {
      if (htmlContent[i] === '<') {
        inTag = true;
      } else if (htmlContent[i] === '>') {
        inTag = false;
      } else if (!inTag) {
        count++;
      }
  
      if (count === position) {
        return i;
      }
    }
  
    return position;
  }
  
const HighLight = () => {
    const [htmlContent, setHtmlContent] = useState('');
    const [plainText, setPlainText] = useState(''); 
    const [highlightedContent, setHighlightedContent] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const plainTextPositions = [
        {
            start: 2,
            end: 5,
        },{
          start:241,
          end:247,
        }
    ]; 
  
      const highlighted = highlightHTMLContent(htmlContent, plainText, plainTextPositions);
      setHighlightedContent(highlighted);
    };
  return (
    <></>
  //   <div>
  //   <h1>HTML Highlighter</h1>
  //   <form onSubmit={handleSubmit}>
  //     <div>
  //       <label htmlFor="htmlContent">HTML Content:</label>
  //       <textarea
  //         id="htmlContent"
  //         value={htmlContent}
  //         onChange={(e) => setHtmlContent(e.target.value)}
  //         required
  //       />
  //     </div>
  //     <div>
  //       <label htmlFor="plainText">Plain Text:</label>
  //       <textarea
  //         id="plainText"
  //         value={plainText}
  //         onChange={(e) => setPlainText(e.target.value)}
  //         required
  //       />
  //     </div>
  //     <button type="submit">Highlight</button>
  //   </form>
  //   <div>
  //     <h2>Highlighted HTML Content:</h2>
  //     <div dangerouslySetInnerHTML={{ __html: highlightedContent }} />
  //   </div>
  // </div>
  )
}

export default HighLight
