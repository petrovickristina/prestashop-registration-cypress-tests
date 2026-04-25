## Bug 1: Lorem Ipsum text visible on homepage

## Description:
Placeholder (Lorem Ipsum) text is displayed instead of real content.

## Steps to reproduce

1. Open homepage  
2. Scroll to "Custom Text Block" section  

## Actual result:
Lorem Ipsum placeholder text is displayed  

## Expected result:
Real, meaningful content should be displayed instead of placeholder text  

## Evidence:
(Screenshot attached)

**Severity:** Low  
**Priority:** Low  

## Bug 2: Incomplete localization on Serbian language

## Description:  
After switching the website language to Serbian, not all UI elements are translated. Some parts of the page remain in English.

## Steps to reproduce:
1. Open the website  
2. Change language to Serbian  
3. Navigate to "Contact us" page  

## Expected result: 
All UI elements should be fully translated into Serbian.

## Actual result:
Some elements remain in English (e.g. "Choose File", "Send your message", placeholder text).

## Evidence:
(Screenshot would be provided here showing mixed language UI)

**Severity:** Medium  
**Priority:** Medium  

## Bug 3: Color filter returns incorrect results

## Description:
Selecting "White" displays black products instead.

## Steps to reproduce:

1. Open the website  
2. Go to products page
3. Click "White" under Color filter

## Expected result:
Only white products are shown

## Actual result:
Black products are displayed

## Evidence:
(Video attached)

**Severity:** High  
**Priority:** High  

## Bug 4: Color filter resets and collapses after specific selection sequence

## Description:
Color filter collapses and resets after a specific sequence of selections.

## Steps to reproduce:

1. Open the website  
2. Go to products page  
3. Scroll to Color filter section  
4. Select "White"  
5. Select "Black"  
6. Select "White"  
7. Select "Black"  

## Actual result:
- Color filter section collapses  
- Selected filters are cleared  
- Both white and black products are displayed (no filtering applied)  

## Expected result:
- Selected filters remain applied  
- Color filter section stays open  
- Only products matching selected filters are displayed  

## Evidence:
(Screenshot and video recording should be attached here)

Severity: High
Priority: Medium 

## Bug 5: Dynamic iframe content affects test stability

## Type: Improvement

## Description:
The registration page uses dynamically generated iframe content (e.g. framelive), which causes unstable selectors and unreliable automated tests.

## Steps to reproduce:

1. Open the website  
2. Open registration page
3. Inspect iframe element
4. Observe changing src attribute

## Expected result:
Stable and predictable DOM structure for reliable test automation.

## Actual result:
Dynamic iframe content causes test instability and makes element targeting difficult.

## Impact:
- Harder to maintain automated tests  
- Increased flakiness  
- Slower debugging