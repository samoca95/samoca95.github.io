---
{"dg-publish":true,"dg-path":"PhD notes/22 Events/EFDC1 EUROMECH - 2D vs 3D SHAP/SHAP structures analysis.md","permalink":"/ph-d-notes/22-events/efdc-1-euromech-2-d-vs-3-d-shap/shap-structures-analysis/"}
---

## The percolation issue:
If we compare the percolation curves of the 2D and the 3D SHAP values, we obtain:
![SHAP structures analysis-attachment-1.png|700](/img/user/9%20Operational/91%20Assets/SHAP%20structures%20analysis-attachment-1.png)

We see two main reasons for the shift towards lower values of H in the 2D case:
- The relative area of a structure in 2D does not correspond directly to its relative volume in 3D. Structures aligned with the Z plane may appear large in 2D (high $V/V_{tot}$) but be much smaller in 3D if their transversal dimension is small, leading to fictitional 2D $V/V_{tot}$ values.
- A single 3D structure with a transversal dimension can have multiple "lobes" intersecting the same z-plane at different locations. In a 2D cut, there is no way to determine whether these separate areas belong to the same 3D structure or different ones. Lower H values result in larger structures and potentially more lobes intersecting the plane, artificially increasing the number of structures per field in 2D. This shifts the 2D N/N_tot curve to the left, as we observed.

Because of this, our preliminary conclusion is that the 2D percolation curve does not provide much useful information regarding the optimal H value to be used.
## Looking for the optimal H in 2D
In order to try to have insights on which H should be used for the segmentation of the 2D domain, several alternatives have been tried:

| ID          | H value | description                                                          |
| ----------- | :-----: | -------------------------------------------------------------------- |
| Hperc2D     |  0.56   | Value that maximizes $N/N_{tot}$ for the 2D database                 |
| Hperc3D     |  1.62   | Value that maximizes $N/N_{tot}$ for the 3D database                 |
| Hopt2D      |  2.16   | Global H value that minimizes the error between the 2Dvs3D databases |
| localHopt2D |   NA    | Local H value that minimizes the 2Dvs3D error for the given field    |

Where the formula used to minimize the error between the 2D and the 3D segmentation is:
$$error = \frac{1}{N_t N_z V_T} \sum_{t}\sum_{z}\sum_{j}\sum_{i} \left| M_{ij}^{3D} - M_{ij}^{2D} \right| \cdot V_{ij}$$
being $M_{ij}^{3D}$ the boolean array resulting of applying the threshold $\sqrt{\phi_u^2(x,y)+\phi_v^2(x,y)} \geq H \cdot \sqrt{\overline{\phi_u^2}(y)+\overline{\phi_v^2}(y)}$.
## Beyond H, the rest of the threshold