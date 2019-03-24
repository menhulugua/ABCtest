# Frontend Coding Exercise

This is the ABC Frontend Coding Exercise done by Xiao Li

Exercise link:  https://github.com/abcaustralia/frontend-coding-exercise



**For accessibility:**
The color I chose for hovered search result has enought contrast from black text, contrast ratio 19.03 : 1, passes WCAG AAA.

Search button doesn't have text in it so I added aria-label attribute.

Added aria-selected attribute for search result selected by tab.

Should give user some hints when loading, not sure if the aria-busy works, or maybe the loading image can be read by software like JAWS.

Things that might improve accessibility that I haven't implemented:
Add arrow key navigation for result list.
focus first element of result list after click button. It will focus the first suburb in the list or "no result found".


**For performance:**
Add a 0.5s delay before calling API to reduce the number of calls.
I try not to add new dependencies, so I didn't use libraries like axios to make request.


**Other:**
The existing css code seems to be in alphabetical order, so when adding new css code I follow this order.

Handle different circumstances when clicking button, i.e. empty input, not match any result, not match result in list
