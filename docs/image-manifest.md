# Image manifest

81 images. Generate each one, save it under the **exact filename** given, and hand
the folder back. `scripts/place-images.mjs` moves them into `public/images/`.

## How to name the files

**Use the filename in each entry.** That is the identifier. Do not render any text,
number or watermark into the image itself: generators mangle small text, and
anything baked into the pixels would appear on the live site.

If your tool cannot set filenames, save them strictly in the numbered order below
as `001.jpg` through `081.jpg`. The placement script accepts either convention.

## Format

JPEG, quality 82 or higher, long edge at least 1600px. Next.js handles resizing
and WebP conversion, so do not pre-optimise.

## The two treatments

Append the matching treatment to every prompt. This is what makes 81 separate
generations read as one commission rather than a stock-photo grab bag.

### Treatment A, location and documentary

> Desaturated documentary photography, natural available light, muted palette of
> concrete grey, sand, weathered steel and off-white. Exactly one saturated red
> object present naturally in the frame, such as a jacket, a hard hat, a vehicle
> light, a painted beam or a crate, kept small and off-centre. Wide, calm, static
> composition with generous empty space on one side. Medium depth of field.
> Photorealistic. No text, no lettering, no signage copy, no logos, no watermarks.
> No faces looking at camera.

### Treatment B, product and still life

> Editorial product photography on a plain mid-grey concrete surface against a
> soft off-white background. Single soft directional key light from upper left,
> gentle falloff, no hard specular hotspots. Muted neutral palette with exactly
> one saturated red element in the frame. Product centred with even margins,
> shallow depth of field. Photorealistic. No text, no packaging copy, no branding,
> no logos, no watermarks, no hands.

### The one rule that matters most

**Red is an object, never a filter.** Do not tint, grade or wash the image red. One
small genuinely red thing in an otherwise muted frame. If a generation comes back
with an overall red cast, discard it.

## A composition constraint on the 12 card images

Every `*-card.jpg` is rendered twice: at **4:3** on the projects index, and
centre-cropped to **3:4** in the homepage carousel. Keep the subject centred and
away from the edges so it survives both crops. This applies only to card images.

---

# Homepage, 8 images

### 001 · `home/hero.jpg` · 4:3 · Treatment A
A small independent shop counter at dusk in a Gulf city. A customer's hands hold a
phone near a card terminal mid-transaction. The shopkeeper is a soft blurred
presence behind the counter. Shelves recede into warm shadow. Red accent: the
terminal's status light. Leave the left third open and uncluttered.

### 002 · `home/pillar-loyalty.jpg` · 16:10 · Treatment A
A neighbourhood bakery counter, hands passing a paper bag across to a regular
customer, both figures cropped at the shoulders. Warm interior, worn wooden
counter. Red accent: the server's apron tie.

### 003 · `home/pillar-sustainability.jpg` · 16:10 · Treatment A
Flattened cardboard stacked neatly beside sorted recycling crates in a service
lane behind a row of shops, early morning light. Orderly, not squalid. Red accent:
one plastic crate.

### 004 · `home/audience-consumers.jpg` · 3:4 · Treatment A
Vertical. A shopper walking away from camera through a covered market arcade,
phone in hand at their side, slight motion blur. Depth down the arcade. Red
accent: a shopfront shutter far down the run.

### 005 · `home/audience-businesses.jpg` · 3:4 · Treatment A
Vertical. A shop owner behind a counter, seen from the side, reviewing a tablet.
Stocked shelves rise behind them. Calm, competent, unglamorous. Red accent: a
product box on a shelf.

### 006 · `home/audience-communities.jpg` · 3:4 · Treatment A
Vertical. A street of small independent storefronts in the late afternoon, two or
three people at middle distance, none prominent. Awnings and shopfront signage
that reads as texture, not lettering. Red accent: one awning.

### 007 · `home/audience-sustainability.jpg` · 3:4 · Treatment A
Vertical. Hands placing a reusable container into a stacked crate at a market
stall. Close, practical, unposed. Red accent: the crate.

### 008 · `home/app.jpg` · 3:4 · Treatment A
Vertical. A phone held loosely at waist height, angled so the screen is not
visible to camera, in a bright everyday street setting. **The screen must not be
readable.** Red accent: the phone case.

---

# Lithium-Ion Battery Manufacturing, 8 images

### 009 · `projects/lithium-battery-card.jpg` · 4:3 · Treatment A · centred
Rows of cylindrical battery cells on an automated assembly line, shallow focus
along the row. Clean industrial interior.

### 010 · `projects/lithium-battery-hero.jpg` · 4:3 · Treatment A
Wide interior of a modern battery manufacturing hall, automated line receding into
depth, overhead gantry lighting. Empty floor space in the left third. Red accent:
a safety bollard.

### 011 · `projects/lithium-battery-storage.jpg` · 4:3 · Treatment A
Grid-scale battery storage containers in a row on a desert site at dawn, solar
array visible behind. Red accent: a warning beacon.

### 012 · `projects/lithium-battery-automotive.jpg` · 4:3 · Treatment A
An electric vehicle battery pack on a workshop assembly frame, seen from a low
three-quarter angle. Red accent: an insulated tool handle.

### 013 · `projects/lithium-battery-electronics.jpg` · 4:3 · Treatment B
A flat-lay of consumer electronics internals: a slim battery cell beside a circuit
board and a disassembled device housing. Red accent: a single ribbon cable.

### 014 · `projects/lithium-battery-healthcare.jpg` · 4:3 · Treatment A
A portable medical monitoring device on a hospital equipment trolley, battery
indicator visible but no readable text. Clean clinical surfaces. Red accent: an
emergency call button on the wall behind.

### 015 · `projects/lithium-battery-tools.jpg` · 4:3 · Treatment B
A cordless industrial power tool laid beside its detached battery pack. Rugged,
used but well kept. Red accent: the tool's trigger housing.

### 016 · `projects/lithium-battery-density.jpg` · 3:4 · Treatment B
Vertical. A single battery cell standing upright, lit dramatically from one side
against deep shadow, emphasising mass and density in a small object. Red accent: a
band around the cell base.

---

# Renewable Energy and Solar Power, 4 images

### 017 · `projects/solar-energy-card.jpg` · 4:3 · Treatment A · centred
A solar array in the desert at low sun, panel rows converging toward the horizon.

### 018 · `projects/solar-energy-hero.jpg` · 4:3 · Treatment A
Wide view across a large photovoltaic field in Saudi desert at golden hour, panels
in parallel rows, distant maintenance vehicle. Open sky in the upper left third.
Red accent: the vehicle.

### 019 · `projects/solar-energy-plant.jpg` · 3:4 · Treatment A
Vertical. Looking up the length of a single tilted solar panel row, strong
perspective, sand and gravel underfoot. Red accent: a cable tag.

### 020 · `projects/solar-energy-epc.jpg` · 16:10 · Treatment A
Two engineers in high-visibility gear installing a panel on a mounting frame, seen
from behind at middle distance. Working, not posing. Red accent: a hard hat.

---

# Cement Manufacturing Plant, 4 images

### 021 · `projects/cement-plant-card.jpg` · 4:3 · Treatment A · centred
Cement silos and a preheater tower against an overcast sky, geometric and still.

### 022 · `projects/cement-plant-hero.jpg` · 4:3 · Treatment A
Wide view of a modern dry-process cement plant at dawn, conveyor gantries crossing
the frame, mountains behind. Sky occupying the upper half. Red accent: a stair
handrail on the tower.

### 023 · `projects/cement-plant-megaprojects.jpg` · 3:4 · Treatment A
Vertical. A cluster of tower cranes over a large urban development at dusk, shot
from below, strong vertical emphasis. Red accent: a crane counterweight marking.

### 024 · `projects/cement-plant-urban.jpg` · 16:10 · Treatment A
Aerial view of a newly built residential district, repeating rooflines and fresh
road grid, sand at the development edge. Red accent: one roof canopy.

---

# Civil Engineering and Construction, 8 images

### 025 · `projects/civil-engineering-card.jpg` · 4:3 · Treatment A · centred
A tower crane against a clear sky, seen from below, structural steel rising.

### 026 · `projects/civil-engineering-hero.jpg` · 4:3 · Treatment A
A multi-level highway interchange under construction, formwork and rebar exposed,
cranes at the far side. Wide, calm, early morning. Red accent: a worker's vest at
distance.

### 027 · `projects/civil-engineering-neom.jpg` · 4:3 · Treatment A
A long linear construction corridor cut through open desert, earthworks and
survey markers running to the horizon. Red accent: a survey stake flag.

### 028 · `projects/civil-engineering-redsea.jpg` · 4:3 · Treatment A
Coastal resort construction on a shallow turquoise shoreline, low-rise structures
and a causeway under build. Red accent: a marker buoy.

### 029 · `projects/civil-engineering-qiddiya.jpg` · 4:3 · Treatment A
A large entertainment and sports venue under construction, curved roof structure
partially clad, scaffolding along one flank. Red accent: scaffold netting tie.

### 030 · `projects/civil-engineering-metro.jpg` · 4:3 · Treatment A
An underground metro station platform nearing completion, clean concrete vault,
track bed in the foreground, no passengers. Red accent: a platform edge marking.

### 031 · `projects/civil-engineering-diriyah.jpg` · 4:3 · Treatment A
Traditional mud-brick heritage architecture under careful restoration, scaffolding
against earthen walls, palm trees. Warm ochre palette. Red accent: a tool bucket.

### 032 · `projects/civil-engineering-roshn.jpg` · 4:3 · Treatment A
A residential community mid-construction, rows of houses at different stages, a
finished show home at the front. Red accent: a door.

---

# Safety Shoes Distribution, 11 images

The eight product tiles must read as one product family. Same surface, same light,
same camera height and distance for all eight. Vary only the boot.

### 033 · `projects/safety-footwear-card.jpg` · 4:3 · Treatment B · centred
A single rugged safety boot, three-quarter view, centred with even margins.

### 034 · `projects/safety-footwear-hero.jpg` · 4:3 · Treatment A
A worker's boots and lower legs on a steel walkway at an industrial site, shot
from above at a slight angle. Grit, wear, competence. Red accent: a floor marking
stripe.

### 035 · `projects/safety-footwear-regulation.jpg` · 16:10 · Treatment A
A row of workers in full protective gear walking away from camera across a large
construction site. Order and scale. Red accent: one helmet.

### 036 · `projects/safety-footwear-steel.jpg` · 4:3 · Treatment B
A black leather steel-toe safety boot, three-quarter view, reinforced toe cap
catching the light.

### 037 · `projects/safety-footwear-composite.jpg` · 4:3 · Treatment B
A lighter grey composite-toe safety shoe, lower profile and more athletic in cut,
same angle as 036.

### 038 · `projects/safety-footwear-puncture.jpg` · 4:3 · Treatment B
A safety boot tilted to show its thick lugged puncture-resistant sole toward
camera, tread pattern the subject.

### 039 · `projects/safety-footwear-antistatic.jpg` · 4:3 · Treatment B
A clean low-cut anti-static safety shoe in dark grey, smooth uppers, technical and
understated.

### 040 · `projects/safety-footwear-waterproof.jpg` · 4:3 · Treatment B
A tall waterproof safety boot with sealed seams, a few beads of water on the
upper.

### 041 · `projects/safety-footwear-heat.jpg` · 4:3 · Treatment B
A heavy heat and chemical resistant boot, thick heat-resistant sole, matte
scuffed finish.

### 042 · `projects/safety-footwear-comfort.jpg` · 4:3 · Treatment B
A lightweight breathable safety trainer with mesh panels and a cushioned midsole,
noticeably lighter in build than the others.

### 043 · `projects/safety-footwear-specialised.jpg` · 4:3 · Treatment B
A tall specialist industrial boot for oil and gas work, buckle or strap closure,
the most heavy-duty of the set.

---

# Food Grain and Consumable Products Trading, 8 images

### 044 · `projects/food-trade-card.jpg` · 4:3 · Treatment A · centred
Stacked jute sacks of grain in a warehouse, shallow focus along the stack.

### 045 · `projects/food-trade-hero.jpg` · 4:3 · Treatment A
A container terminal at a Gulf port at first light, stacked containers and a gantry
crane, calm water. Open sky in the upper left. Red accent: one container.

### 046 · `projects/food-trade-grains.jpg` · 4:3 · Treatment B
Open jute sacks of basmati rice, wheat and barley side by side, grain spilling
slightly onto the surface. Red accent: a sack stripe.

### 047 · `projects/food-trade-natural.jpg` · 4:3 · Treatment B
Bulk legumes, chickpeas, lentils and seeds in shallow open bowls arranged in a
loose cluster, varied texture.

### 048 · `projects/food-trade-oils.jpg` · 4:3 · Treatment B
Unlabelled glass bottles of cooking oil in a row, backlit so the oil glows amber.
No labels of any kind.

### 049 · `projects/food-trade-spices.jpg` · 4:3 · Treatment B
Mounded whole and ground spices in small bowls, deep earth tones. This is the one
frame where warm colour is allowed to dominate; a paprika red counts as the
accent.

### 050 · `projects/food-trade-meat.jpg` · 4:3 · Treatment B
Fresh cuts of red meat on a clean stainless steel surface in a cold room, clinical
and hygienic rather than appetising. Red accent: the meat itself.

### 051 · `projects/food-trade-customers.jpg` · 3:4 · Treatment A
Vertical. A commercial kitchen goods entrance receiving a bulk delivery, crates
stacked on a trolley, staff in the background out of focus. Red accent: a crate.

---

# General Trading and Import-Export, 7 images

### 052 · `projects/general-trading-card.jpg` · 4:3 · Treatment A · centred
A stacked wall of shipping containers, straight on, colour muted to greys with one
red container centred.

### 053 · `projects/general-trading-hero.jpg` · 4:3 · Treatment A
A freight truck on an open desert highway at dusk, containers stacked at a depot
in the far background. Motion and distance. Red accent: tail lights.

### 054 · `projects/general-trading-construction.jpg` · 4:3 · Treatment B
Building materials arranged as a still life: stacked tiles, a coil of electrical
cable, a length of aluminium profile, a plumbing fitting.

### 055 · `projects/general-trading-industrial.jpg` · 4:3 · Treatment A
An industrial generator and transformer unit in a plant yard, heavy machinery seen
in three-quarter view. Red accent: a valve wheel.

### 056 · `projects/general-trading-medical.jpg` · 4:3 · Treatment B
Medical equipment as a still life: a stethoscope, a stainless instrument tray and
a sealed sterile pouch, arranged with clinical spacing.

### 057 · `projects/general-trading-agri.jpg` · 4:3 · Treatment B
Agricultural commodities as a still life: grain, pulses and a small pile of raw
sugar in shallow dishes.

### 058 · `projects/general-trading-consumer.jpg` · 4:3 · Treatment B
Consumer goods as a still life: a folded garment, a leather bag and a wristwatch,
arranged with generous spacing. No branding of any kind.

---

# Pharmaceutical Manufacturing Plant, 6 images

Generic unbranded medicine only. No packaging copy, no imprints, no pill markings.

### 059 · `projects/pharma-manufacturing-card.jpg` · 4:3 · Treatment A · centred
A tablet press or blister line in operation, shallow focus across the running
strip.

### 060 · `projects/pharma-manufacturing-hero.jpg` · 4:3 · Treatment A
A clean pharmaceutical production hall, stainless equipment and epoxy floor, a
technician in full cleanroom gown at middle distance, back to camera. Red accent:
an emergency stop button.

### 061 · `projects/pharma-manufacturing-diabetic.jpg` · 4:3 · Treatment B
Plain white oblong tablets loose on a clean surface beside an unmarked blister
strip. Clinical and calm.

### 062 · `projects/pharma-manufacturing-cardio.jpg` · 4:3 · Treatment B
Small round unmarked tablets in two sizes grouped in a shallow dish, one dish
slightly out of focus behind.

### 063 · `projects/pharma-manufacturing-gastro.jpg` · 4:3 · Treatment B
Two-tone unmarked capsules scattered in a loose arrangement, catching soft light.

### 064 · `projects/pharma-manufacturing-analgesic.jpg` · 4:3 · Treatment B
Plain white round tablets spilling from an unlabelled amber glass bottle onto the
surface.

---

# Vision 2030 Healthcare Development, 4 images

### 065 · `projects/healthcare-development-card.jpg` · 4:3 · Treatment A · centred
A modern hospital exterior facade, clean horizontal lines, palm trees at the base.

### 066 · `projects/healthcare-development-hero.jpg` · 4:3 · Treatment A
A bright contemporary hospital atrium, tall glazing and clean architecture, a few
distant figures. Wide and airy, empty space at the right. Red accent: wayfinding
signage panel with no readable text.

### 067 · `projects/healthcare-development-market.jpg` · 3:4 · Treatment A
Vertical. A retail pharmacy aisle seen down its length, shelves of unbranded boxes
receding, clean lighting. Red accent: a shelf edge strip.

### 068 · `projects/healthcare-development-intelligence.jpg` · 16:10 · Treatment A
A hospital pharmacy stock room with an operator checking inventory on a handheld
scanner, shelving in ordered rows. Red accent: a bin label.

---

# Smart Taxi, 3 images

### 069 · `projects/smart-taxi-card.jpg` · 4:3 · Treatment A · centred
A clean modern white sedan taxi photographed on a city street, three-quarter
front, roof sign visible but bearing no readable text.

### 070 · `projects/smart-taxi-hero.jpg` · 4:3 · Treatment A
A white sedan taxi waiting at a city intersection at blue hour, skyline behind,
light trails from passing traffic. Red accent: a traffic signal.

### 071 · `projects/smart-taxi-city.jpg` · 16:10 · Treatment A
A wide Riyadh boulevard at dusk from an elevated viewpoint, dense traffic flowing,
towers behind. Red accent: massed tail lights.

---

# Mega Manpower Sourcing, 3 images

Dignified and respectful throughout. Workers are skilled professionals, never
anonymous labour. No crowding, no faces to camera.

### 072 · `projects/manpower-sourcing-card.jpg` · 4:3 · Treatment A · centred
Three workers in clean high-visibility gear and hard hats walking together across
a site, seen from behind at middle distance.

### 073 · `projects/manpower-sourcing-hero.jpg` · 4:3 · Treatment A
A skilled tradesperson in protective gear working on equipment at a large
industrial site, shot in profile at a respectful distance, city towers rising in
the far background. Red accent: a hard hat.

### 074 · `projects/manpower-sourcing-office.jpg` · 16:10 · Treatment A
A clean modern corporate office building exterior in a Saudi business district,
morning light, few people. Red accent: an entrance canopy edge.

---

# Digital Advertising and Electronic Media, 7 images

### 075 · `projects/digital-advertising-card.jpg` · 4:3 · Treatment A · centred
A large outdoor LED billboard at night above a road, screen showing abstract
colour only, no readable content.

### 076 · `projects/digital-advertising-hero.jpg` · 4:3 · Treatment A
A tall digital signage tower over a city boulevard at blue hour, screen glowing
with abstract gradient light, traffic below. **The screen must carry no text or
imagery, only abstract colour.** Red accent: the screen's dominant hue.

### 077 · `projects/digital-advertising-giga.jpg` · 16:10 · Treatment A
A mega development site ringed by tall construction hoarding, a digital display
mounted on the hoarding showing abstract colour. Red accent: the hoarding trim.

### 078 · `projects/digital-advertising-outdoor.jpg` · 4:3 · Treatment A
A large-format roadside LED billboard seen from a low angle against evening sky,
blank abstract screen content.

### 079 · `projects/digital-advertising-indoor.jpg` · 4:3 · Treatment A
An LED video wall in a shopping mall atrium, shoppers passing as soft motion blur,
screen showing abstract colour only.

### 080 · `projects/digital-advertising-mobile.jpg` · 4:3 · Treatment A
A mobile LED screen truck parked at an outdoor event at dusk, screen blank and
abstract, crowd silhouettes at distance.

### 081 · `projects/digital-advertising-production.jpg` · 4:3 · Treatment A
A video production setup: a cinema camera on a tripod, a lighting stand and a
monitor showing abstract colour, crew member out of focus behind. Red accent: a
cable wrap.

---

## After generation

```bash
node scripts/place-images.mjs ~/path/to/generated-folder
npm test
```

The placement script reports anything unmatched. Once all 81 resolve, set
`NEXT_PUBLIC_HOLYLOY_IMAGES_PENDING=0` in `.env` and the conformance suite will
confirm every reference resolves.
