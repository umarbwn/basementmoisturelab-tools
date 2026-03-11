# Sump Pump Size Calculator: Find the Exact GPM and Horsepower You Need

**Buying the wrong sump pump is one of the most expensive basement mistakes a homeowner can make.** Too small, and your pump runs constantly, burns out prematurely, and fails during the storm that matters most. Too large, and you're overspending on capacity you'll never use — while short cycling destroys the motor just as fast.

The **Sump Pump Size Calculator** solves this with engineering-grade precision. Enter your drainage area, local rainfall intensity, and basin dimensions — and get back the exact inflow rate, recommended pump capacity in GPM, required horsepower, and estimated pump cycle time. In both imperial and metric units.

No more guessing. No more relying on a salesperson's recommendation. Just the right pump for your specific situation.

---

## What Is the Sump Pump Size Calculator?

The **Sump Pump Size Calculator** is a free engineering tool that calculates the correct sump pump size for your home based on four real inputs:

- **Roof / Drainage Area** — the square footage (or m²) of surface area draining toward your foundation
- **Rainfall Intensity** — the peak inches-per-hour rainfall rate in your area
- **Basin Diameter** — the width of your sump pit in inches (or mm)
- **Basin Depth** — the depth of your sump pit in inches (or mm)

From these inputs, the calculator derives five critical outputs:

| Output | What It Tells You |
|---|---|
| **Estimated Water Inflow (GPM)** | How many gallons per minute enter the basin during peak rain |
| **Basin Volume (gallons)** | Total water storage capacity of your sump pit |
| **Recommended Pump Capacity (GPM)** | Minimum pump output needed, with a 1.5× safety margin |
| **Pump Horsepower** | Motor size required to deliver that flow rate |
| **Pump Cycle Time (minutes)** | How long each pump activation lasts before the basin empties |

The tool supports both **imperial** (sq ft, inches) and **metric** (m², mm) inputs — making it useful for homeowners and contractors across North America and internationally.

---

## The Engineering Behind the Calculator

Understanding the math helps you trust the results and make better decisions. Here's exactly how each output is calculated.

### Step 1: Estimating Water Inflow Rate (GPM)

The calculator converts your roof and drainage area into a volumetric flow rate using this formula:

```
Inflow (cubic ft/hr) = Drainage Area (sq ft) × Rainfall Rate (in/hr) ÷ 12
Inflow (gallons/hr)  = Inflow (cubic ft/hr) × 7.48
Inflow (GPM)         = Inflow (gallons/hr) ÷ 60
```

This gives you the peak rate at which water enters your sump basin during the design storm — the most important number in pump sizing.

**Example:** A 2,000 sq ft drainage area with 1 inch/hour rainfall:
- 2,000 × (1 ÷ 12) = 166.7 cubic ft/hr
- 166.7 × 7.48 = 1,247 gallons/hr
- 1,247 ÷ 60 = **20.8 GPM inflow**

### Step 2: Calculating Basin Volume

Basin volume is calculated using the cylinder volume formula:

```
Basin Volume (cubic ft) = π × (Diameter/2)² × Depth
Basin Volume (gallons)  = Basin Volume (cubic ft) × 7.48
```

Knowing your basin volume is critical for two reasons: it determines how much surge capacity you have during peak inflow, and it directly controls how often the pump cycles.

### Step 3: Recommended Pump Capacity

The calculator applies a **1.5× safety factor** on top of the calculated inflow rate:

```
Recommended Pump GPM = Inflow GPM × 1.5
```

This safety margin accounts for real-world variables the formula can't capture — clogged discharge lines, aging pump efficiency, unusually intense rainfall, and groundwater seeping in through the foundation in addition to surface drainage. Industry standards consistently recommend sizing sump pumps at 1.5× to 2× the calculated inflow rate.

### Step 4: Horsepower Selection

The calculator maps your recommended GPM to standard pump horsepower ratings:

| Recommended GPM | Horsepower |
|---|---|
| Up to 40 GPM | ¼ HP |
| 41 – 80 GPM | ½ HP |
| 81 – 120 GPM | ¾ HP |
| 121+ GPM | 1 HP |

These thresholds align with the capacity curves of standard residential submersible sump pumps at typical total dynamic head (TDH) values of 10–15 feet.

### Step 5: Cycle Time

```
Cycle Time (minutes) = Basin Volume (gallons) ÷ Recommended Pump GPM
```

Cycle time tells you how long the pump runs per activation before the basin empties and the float switch cuts power. This is a critical health metric for your pump — more on that below.

---

## How to Use the Sump Pump Size Calculator: Step-by-Step

### Step 1: Choose Your Units
Select **Imperial** (sq ft, inches) or **Metric** (m², mm) depending on your preference. The calculator handles all conversions internally, so your results are always accurate regardless of which system you choose.

### Step 2: Enter Your Drainage Area
This is the total surface area that sheds water toward your foundation. For most homes, this equals the **roof footprint** — the square footage of the home's floor plan, not the total roof surface area. If you also have concrete patios, driveways, or other hardscaping that drains toward the foundation, add those areas too.

**How to find it:** Multiply your home's length by its width. A 40 ft × 50 ft home has a 2,000 sq ft drainage area. For metric users, a 12m × 15m home = 180 m².

### Step 3: Enter Rainfall Intensity
This is the peak rainfall rate (in inches per hour) your sump system needs to handle. This is **not** annual average rainfall — it's the intensity of the design storm you're sizing for.

**How to find your local design storm intensity:**
- Check NOAA's Precipitation Frequency Data Server (PFDS) for U.S. locations
- Look up the 10-year or 25-year, 1-hour storm event for your ZIP code
- Typical values range from 1.0 to 3.5 inches/hour depending on region
- Conservative default: use **2.0 inches/hour** if you're unsure

### Step 4: Enter Basin Dimensions
Measure your existing sump pit or use standard dimensions if you're planning a new installation:

- **Standard residential basin diameter:** 18 inches (most common) or 24 inches (high-capacity)
- **Standard basin depth:** 22–30 inches for most residential applications

If your basin is square or rectangular rather than round, calculate an equivalent circular diameter: Diameter = 2 × √(Length × Width ÷ π).

### Step 5: Calculate and Interpret Results
Click **Calculate Pump Size** and review all five outputs. Use the recommended GPM and horsepower to select your pump, and use the cycle time to verify the pump is appropriately matched to your basin size.

---

## What Is a Good Pump Cycle Time — and Why It Matters

Cycle time is the output most homeowners ignore — and it's the one most likely to determine how long your pump lasts.

**The ideal cycle time is 1–3 minutes per activation.**

Here's why this range matters:

### Too Short (Under 1 Minute) — Short Cycling
If the pump empties the basin in less than a minute, it's activating and deactivating many times per hour. Every start cycle draws a large current surge that generates heat in the motor windings. Frequent short cycles cause:
- Premature motor burnout
- Capacitor failure
- Overheated bearings
- Dramatically shortened pump lifespan (often 2–3 years instead of 7–10)

**Fix:** Increase basin volume (larger diameter pit), reduce pump capacity, or install a larger basin liner.

### Too Long (Over 5 Minutes) — Oversized Basin or Undersized Pump
If the basin takes more than 5 minutes to empty, your pump may be undersized relative to the basin, or your basin is larger than necessary for your inflow rate. While less damaging than short cycling, very long cycle times mean the basin stays full longer, increasing the risk of overflow during sustained heavy rain.

**Fix:** Upgrade pump capacity, or verify that your basin dimensions are appropriate for your inflow rate.

---

## Choosing the Right Sump Pump: Submersible vs. Pedestal

Once you have your GPM and horsepower requirements from the calculator, you'll need to choose between the two main pump types.

### Submersible Sump Pumps
The pump motor sits inside the basin, submerged in water. The water itself cools the motor during operation.

**Advantages:**
- Quieter operation (motor is submerged)
- More powerful options available
- Better for high-GPM requirements
- Sealed design handles debris better

**Best for:** Most residential applications, high-inflow situations, and finished basements where noise matters.

**Lifespan:** 7–15 years with proper maintenance

**Cost range:** $100–$600 depending on capacity

### Pedestal Sump Pumps
The motor sits above the basin on a pedestal, with only the impeller submerged.

**Advantages:**
- Easier to access for maintenance and replacement
- Lower upfront cost
- Motor runs cooler (not submerged)

**Best for:** Narrow basins where a submersible won't fit, budget-conscious applications, lower inflow rates

**Lifespan:** 10–25 years (motor runs cooler, less thermal stress)

**Cost range:** $60–$200

---

## Sump Pump Horsepower Guide: Which HP Do You Actually Need?

The horsepower recommendations in the calculator align with these real-world scenarios:

### ¼ HP Sump Pump (Up to 40 GPM Recommended)
**Typical application:** Homes under 1,500 sq ft in low-to-moderate rainfall areas (1–1.5 in/hr design storm)

A ¼ HP pump handles most average residential situations. It's the most common size sold for homes that experience occasional, moderate water intrusion rather than frequent or severe flooding. Don't underestimate it — a quality ¼ HP submersible can move 1,500–2,000 gallons per hour at 10 feet of head.

### ½ HP Sump Pump (41–80 GPM Recommended)
**Typical application:** Homes 1,500–3,000 sq ft, moderate-to-heavy rainfall areas (1.5–2.5 in/hr), or homes in high water table zones

The ½ HP is the most popular upgrade choice and the sweet spot for most homes that experience regular water issues. It offers significantly more capacity than ¼ HP while remaining energy-efficient.

### ¾ HP Sump Pump (81–120 GPM Recommended)
**Typical application:** Large homes over 3,000 sq ft, heavy rainfall regions (2.5–3.5 in/hr), or properties with significant groundwater pressure

¾ HP pumps are appropriate for serious water management situations. They're commonly used in conjunction with interior drainage systems and are often specified by waterproofing contractors for homes with chronic flooding histories.

### 1 HP Sump Pump (121+ GPM Recommended)
**Typical application:** Very large drainage areas, extreme rainfall regions, properties with severe groundwater issues, or commercial/semi-commercial applications

A 1 HP residential sump pump can move 4,000–6,000+ gallons per hour depending on the model. At this level, also consider whether a dual-pump system (primary + backup) is more appropriate than a single high-capacity unit.

---

## Sump Pump Backup Systems: Why Your Primary Pump Isn't Enough

Every homeowner who relies on a sump pump should have a backup system. The most common scenario for basement flooding isn't an undersized pump — it's a working pump with no power during the storm that caused the flooding.

### Battery Backup Sump Pumps
A battery backup unit sits in the same basin as your primary pump and activates automatically when:
- The primary pump fails
- Power goes out
- Inflow exceeds the primary pump's capacity

**Capacity:** Battery backups typically provide 1,500–3,000 gallons of emergency pumping before the battery depletes, sufficient for most short outages.

**Cost:** $150–$400 for the unit; battery replacement every 3–5 years

### Water-Powered Backup Sump Pumps
Uses municipal water pressure (Venturi effect) to pump water out of the basin — no electricity required.

**Advantage:** Unlimited run time during outages (as long as city water is available)
**Disadvantage:** Uses 1 gallon of city water for every 2 gallons pumped; not suitable for areas on well water

### Generator Backup
A whole-home or portable generator ensures your primary sump pump keeps running regardless of grid power status. This is the most comprehensive backup solution for homes in areas with frequent extended outages.

---

## Key Factors That Affect Sump Pump Performance

The calculator provides accurate sizing based on your inputs, but these real-world factors can affect actual performance in the field:

### Total Dynamic Head (TDH)
All pump GPM ratings are specified at a given head pressure — the vertical height the pump must push water plus friction losses in the discharge pipe. A pump rated at 60 GPM at 0 feet of head might only deliver 40 GPM at 15 feet. Always check the pump's performance curve and size based on your **actual discharge height**, not the nominal rating.

**Typical residential TDH:** 10–20 feet (vertical rise from basin to discharge point outside)

### Discharge Line Diameter
Undersized discharge piping creates friction that reduces effective flow rate. Standard recommendation: use 1.5-inch diameter pipe for pumps up to ½ HP and 2-inch pipe for ¾ HP and above.

### Check Valve Condition
A failed or missing check valve allows pumped water to flow back into the basin after each cycle, causing the pump to re-pump the same water repeatedly. This dramatically increases cycle frequency and accelerates wear. Inspect and replace check valves every 3–5 years.

### Pump Age and Impeller Wear
Pump capacity degrades over time as impellers wear. A 10-year-old pump may deliver only 70–80% of its original rated capacity. If your pump is aging, recalculate using a 20–25% performance reduction factor.

---

## Maintenance Checklist: Keeping Your Sump Pump Ready

A correctly sized pump that isn't maintained will still fail when you need it most. Follow this schedule:

**Monthly (during wet season):**
- Pour water into the basin to confirm the float switch triggers and pump activates
- Listen for unusual noises (grinding, rattling) during operation
- Verify discharge is flowing freely at the exterior outlet

**Annually:**
- Disconnect and clean the pump intake screen of debris
- Test the check valve by manually lifting and releasing it
- Inspect the discharge line for blockages, ice (in winter), or animal nesting
- Test battery backup capacity under load
- Record the pump's cycle time and compare to baseline — increasing cycle time may indicate impeller wear

**Every 3–5 Years:**
- Replace the check valve
- Replace backup battery
- Have the basin inspected for cracks or settling that could affect volume

---

## Frequently Asked Questions

### How do I find the rainfall intensity for my area?

For U.S. homeowners, NOAA's Precipitation Frequency Data Server provides rainfall intensity data by location and return period. Search for the "1-hour, 10-year" event to find the intensity a properly designed system should handle. Values typically range from 1.0 inch/hour in the Pacific Northwest to 3.5+ inches/hour in parts of the Gulf Coast and Midwest.

### My calculator result shows ¼ HP but the contractor recommends ½ HP. Who's right?

Contractors often recommend one size up from the minimum calculated requirement — and this is reasonable. The calculator already applies a 1.5× safety factor, but contractors factor in additional real-world variables: aging discharge lines, potential basin silting, and the cost of a return visit if the smaller pump proves insufficient. A ½ HP pump in a situation that technically needs ¼ HP will simply cycle less frequently and last longer. It's a conservative choice that's hard to criticize.

### Can I use this calculator for a crawl space sump pump?

Yes, with modification. For crawl spaces, the drainage area should reflect the crawl space floor area plus any surrounding soil that drains toward it. Crawl space pumps often handle lower GPM but may need to run more continuously due to groundwater seepage. The same GPM and horsepower logic applies.

### What happens if I oversize my sump pump?

An oversized pump empties the basin too quickly, causing short cycling — rapid on-off activation that overheats the motor and dramatically shortens pump life. Bigger is not always better with sump pumps. The goal is a pump that runs for 1–3 minutes per cycle, not one that can empty the basin in 20 seconds.

### Should I get a ⅓ HP pump instead of ¼ HP?

Many manufacturers offer ⅓ HP as a step between ¼ and ½ HP. The calculator outputs align with standard ¼, ½, ¾, and 1 HP tiers, which are the most widely available. If a ⅓ HP unit meets your calculated GPM requirement, it's a perfectly valid choice — check the manufacturer's performance curve at your actual head height to confirm.

### How long do sump pumps last?

Quality submersible sump pumps last 7–15 years under normal operating conditions. Pedestal pumps can last 10–25 years. Short cycling, running dry, power surges, and poor water quality (sediment, hard water) all reduce lifespan. A properly sized pump — as calculated by this tool — will outlast an over- or undersized unit by years.

---

## Get Your Sump Pump Size Now

Stop guessing and stop relying on generic "1,500 sq ft = ½ HP" rules of thumb that ignore your local rainfall, your basin dimensions, and your actual inflow rate. The **Sump Pump Size Calculator** gives you a result built from your real numbers — so you can buy the right pump the first time.

*The right sump pump doesn't just move water. It moves the right amount of water, at the right speed, without burning itself out doing it.*

---

*Disclaimer: Results generated by this calculator are based on standard hydraulic engineering formulas and industry-accepted safety factors. Actual pump performance varies based on total dynamic head, discharge line configuration, pump model, and site-specific conditions. For complex drainage situations, high water table environments, or large-scale installations, consult a licensed plumber or waterproofing engineer before purchasing equipment.*