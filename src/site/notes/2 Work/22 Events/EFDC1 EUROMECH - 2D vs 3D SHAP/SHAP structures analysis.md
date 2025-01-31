---
{"dg-publish":true,"dg-path":"PhD notes/22 Events/EFDC1 EUROMECH - 2D vs 3D SHAP/SHAP structures analysis.md","permalink":"/ph-d-notes/22-events/efdc-1-euromech-2-d-vs-3-d-shap/shap-structures-analysis/"}
---

## 1. The percolation issue
When comparing the percolation curves of the 2D and 3D SHAP values, we observe: ![SHAP structures analysis-attachment-1.png|700](/img/user/9%20Operational/91%20Assets/SHAP%20structures%20analysis-attachment-1.png) *Caption: Comparison of the percolation curve for the 3D case (left) and the 2D case (right).* 

Two main factors contribute to the shift toward lower H values in the 2D case: 
- **Dimensional Discrepancy:** In 2D, the relative area of a structure does not directly correspond to its relative volume in 3D. For example, structures aligned with the Z plane may appear large in 2D (i.e., high $V/V_{tot}$) but can be much smaller in 3D if their transversal dimension is limited. This mismatch leads to artificially inflated 2D $V/V_{tot}$ values. 
- **Ambiguity in Structure Identification:** A single 3D structure with a transversal extent can intersect a given z-plane at multiple, spatially separated "lobes." In a 2D slice, it is impossible to determine whether these separate areas belong to the same 3D structure or to different ones. At lower H values, where structures are larger, more lobes may intersect the plane. This increases the apparent number of structures in 2D, shifting the 2D N/N_tot curve to the left. 

> [!info] **Note:** 
> As a result, our preliminary conclusion is that the 2D percolation curve does not provide useful guidance for determining the optimal H value.

---
## 2. Looking for the optimal H in 2D
To determine a suitable H value for segmenting the 2D domain, several alternatives were explored:

| ID              | H value | Description                                                              |
| --------------- | :-----: | ------------------------------------------------------------------------ |
| **Hperc2D**     |  0.56   | Maximizes $N/N_{tot}$ for the 2D database.                               |
| **Hperc3D**     |  1.62   | Maximizes $N/N_{tot}$ for the 3D database.                               |
| **Hopt2D**      |  2.16   | Global H value that minimizes the error between the 2D and 3D databases. |
| **localHopt2D** |   NA    | Local H value that minimizes the 2D vs 3D error for a given field.       |

The error between the 2D and 3D segmentations is defined as:
$$error = \frac{1}{N_t N_z V_T} \sum_{t}\sum_{z}\sum_{j}\sum_{i} \left| M_{ij}^{3D} - M_{ij}^{2D} \right| \cdot V_{ij}$$
where $M_{ij}^{3D}$ is the boolean array obtained by applying the threshold: 
$$
\sqrt{\phi_u^2(x,y)+\phi_v^2(x,y)} \geq H \cdot \sqrt{\overline{\phi_u^2}(y)+\overline{\phi_v^2}(y)}
$$ 
The segmentation results are shown below:
![SHAP structures analysis-attachment-2.png|800](/img/user/9%20Operational/91%20Assets/SHAP%20structures%20analysis-attachment-2.png)
*Caption: Segmentation of the domain for each H value, snapshot 8000, zcut=48. 2D results appear on the left; 3D results on the right.*

And these are the resulting PDFs:
![SHAP structures analysis-attachment-3.png|700](/img/user/9%20Operational/91%20Assets/SHAP%20structures%20analysis-attachment-3.png)
*Caption: PDFs for different H values. 2D results are on the left; 3D results on the right.* 

Optimizing H does not seem to make the 2D and 3D results converge. Therefore, we turn our attention to a statistical analysis. 

---
## 3. Beyond H, the rest of the threshold
The segmentation threshold condition is the product of a constant H and a y-dependent factor: 
$$
\sqrt{\phi_u^2(x,y)+\phi_v^2(x,y)} \geq H \cdot \boxed{\sqrt{\overline{\phi_u^2}(y)+\overline{\phi_v^2}(y)}}
$$
A comparison of $\sqrt{\overline{\phi_u^2}(y)+\overline{\phi_v^2}(y)}$ for the 2D and 3D cases reveals a significant difference in behavior up to $y^+\approx 15$:
![SHAP structures analysis-attachment-4.png|500](/img/user/9%20Operational/91%20Assets/SHAP%20structures%20analysis-attachment-4.png)
*Caption: Evolution of the y-dependent threshold for the 2D case (purple), 3D case with only horizontal and vertical velocities (blue), and 3D case with all velocity components (green). The results are non-dimensionalized using the mid-channel value for comparison.*

> [!important] Observation:
> This difference translates into a much larger threshold for the 2D case for the same value of H for $y^+<15$. Thus introducing a bias during segmentation.

> [!Example] Verification
> A test was done where the 3D threshold curve was applied to the 2D segmentation. The results are shown below:
> ![SHAP structures analysis-attachment-5.png|500](/img/user/9%20Operational/91%20Assets/SHAP%20structures%20analysis-attachment-5.png) 
> *Caption: PDF of the 2D SHAP values using the $\sqrt{\overline{\phi_u^2}(y)+\overline{\phi_v^2}(y)}$ factor from the 2D data (left) versus the 3D data (right). Note that both PDFs correspond to the 2D case, with only the y-dependent threshold adjusted.*
> 
> - The "legs" of the distribution for $y^+<15$ are broader when the 3D threshold is used, indicating that more structures are captured in that region.
> - Note that the PDF is normalized such that the maximum bin equals 1. If the number of structures captured for $y^+<15$ is substantially higher than in regions with $y^+>15$, the larger bin dominates the normalization, rendering the number of structures in the $u^+>0, y^+>15$ region nearly insignificant in the plot (the minimum color is not zero). 
> 
> This theory is further supported by adjusting the colormap range: 
> ![SHAP structures analysis-attachment-6.png|500](/img/user/9%20Operational/91%20Assets/SHAP%20structures%20analysis-attachment-6.png) 
> *Caption: Same as the previous figure, but with a reduced minimum for the colormap range.*

It is important to note that the modification of the factor $\sqrt{\overline{\phi_u^2}(y)+\overline{\phi_v^2}(y)}$ is not arbitrary—it reflects a statistical property captured by the SHAP values. Detailed analysis indicates that $\overline{\phi_u^2}(y)$ is the main responsible for these discrepancies. So, the next question is: **Why is there such a difference in the evolution of $\sqrt{\overline{\phi_u^2}(y)+\overline{\phi_v^2}(y)}$ between the 2D and 3D cases?**

---
## 4. Identifying the problem
Examining the instantaneous fields reveals that the high values of $\sqrt{\overline{\phi_u^2}(y)+\overline{\phi_v^2}(y)}$ near the wall are not inherited from the input velocity fields or from the U-net predictions. However, a closer look at the instantaneous horizontal SHAP values shows some irregular behavior in the near-wall region for the 2D case:
![SHAP structures analysis-attachment-8.png|800](/img/user/9%20Operational/91%20Assets/SHAP%20structures%20analysis-attachment-8.png)
*Caption: Instantaneous horizontal SHAP fields. The left plots show the 2D case, and the right ones show the 3D case. The upper plots display the entire domain, while the lower plots focus on the near-wall region up to $y^+ \approx 15$, where the discrepancies are most pronounced.*

In the 2D case, spurious phenomena seem to occur close to the wall, which are not present in the 3D SHAPs. This pattern is consistent across multiple snapshots and explains the different statistical evolution for low $y^+$ values. Interestingly, preliminary results for the 2D case including all three velocity components ($u$, $v$, and $w$) show that the spurious behavior is mitigated compared to the 2D case with only $u$ and $v$:
![SHAP structures analysis-attachment-9.png|400](/img/user/9%20Operational/91%20Assets/SHAP%20structures%20analysis-attachment-9.png)
*Caption: Instantaneous horizontal SHAP field for the 2D case with $u$, $v$, and $w$ in the near-wall region.* 

Note that apart from including the $w$ component, the code remains unchanged between the 2D-uv and 2D-uvw cases.

---
## 5. Open Questions 
Several questions remain: 
> [!faq] **Questions to be Answered:** 
> 1. **Physical Explanation:** 
>     Does this behavior have a physical basis? Is it reasonable to observe these results in the 2D case? 
>     
> 1. **SHAP Implementation:**
>     Could the issue be related to the SHAP implementation? Are we overlooking something when adapting it to 2D? 
>     
> 1. **Code Integrity:**
>     Is there a potential bug in the code that could be causing these discrepancies?