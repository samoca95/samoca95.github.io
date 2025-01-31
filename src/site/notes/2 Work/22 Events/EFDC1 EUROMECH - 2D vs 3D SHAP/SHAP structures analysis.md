---
{"dg-publish":true,"dg-path":"PhD notes/22 Events/EFDC1 EUROMECH - 2D vs 3D SHAP/SHAP structures analysis.md","permalink":"/ph-d-notes/22-events/efdc-1-euromech-2-d-vs-3-d-shap/shap-structures-analysis/"}
---

## 1. The percolation issue
If we compare the percolation curves of the 2D and the 3D SHAP values, we obtain:
![SHAP structures analysis-attachment-1.png|700](/img/user/9%20Operational/91%20Assets/SHAP%20structures%20analysis-attachment-1.png)
*Caption: comparison of the percolation curve of the 3D case (left) and the 2D case (right)*

We see two main reasons for the shift towards lower values of H in the 2D case:
- The relative area of a structure in 2D does not correspond directly to its relative volume in 3D. Structures aligned with the Z plane may appear large in 2D (high $V/V_{tot}$) but be much smaller in 3D if their transversal dimension is small, leading to fictitional 2D $V/V_{tot}$ values.
- A single 3D structure with a transversal dimension can have multiple "lobes" intersecting the same z-plane at different locations. In a 2D cut, there is no way to determine whether these separate areas belong to the same 3D structure or different ones. Lower H values result in larger structures and potentially more lobes intersecting the plane, artificially increasing the number of structures per field in 2D. This shifts the 2D N/N_tot curve to the left, as we observed.

> [!info] Because of this, our preliminary conclusion is that the 2D percolation curve does not provide much useful information regarding the optimal H value to be used.

## 2. Looking for the optimal H in 2D
In order to try to have insights on which H should be used for the segmentation of the 2D domain, several alternatives have been tried:

| ID          | H value | Description                                                          |
| ----------- | :-----: | -------------------------------------------------------------------- |
| Hperc2D     |  0.56   | Value that maximizes $N/N_{tot}$ for the 2D database                 |
| Hperc3D     |  1.62   | Value that maximizes $N/N_{tot}$ for the 3D database                 |
| Hopt2D      |  2.16   | Global H value that minimizes the error between the 2Dvs3D databases |
| localHopt2D |   NA    | Local H value that minimizes the 2Dvs3D error for the given field    |

Where the formula used to minimize the error between the 2D and the 3D segmentation is:
$$error = \frac{1}{N_t N_z V_T} \sum_{t}\sum_{z}\sum_{j}\sum_{i} \left| M_{ij}^{3D} - M_{ij}^{2D} \right| \cdot V_{ij}$$
being $M_{ij}^{3D}$ the boolean array resulting of applying the threshold $\sqrt{\phi_u^2(x,y)+\phi_v^2(x,y)} \geq H \cdot \sqrt{\overline{\phi_u^2}(y)+\overline{\phi_v^2}(y)}$.

The results for the segmentation are the following:
![SHAP structures analysis-attachment-2.png|800](/img/user/9%20Operational/91%20Assets/SHAP%20structures%20analysis-attachment-2.png)
*Caption: segmentation of the domain for each of the H values, snapshot 8000, zcut=48. The 2D results are shown at the left, 3D results at the right.*

And these are the resulting PDFs:
![SHAP structures analysis-attachment-3.png|700](/img/user/9%20Operational/91%20Assets/SHAP%20structures%20analysis-attachment-3.png)
*Caption: PDFs obtained with the different H values. The 2D results are shown at the left, 3D results at the right.*

As we can see, optimizing the H does not seem to make them look closer. So we need to look further. Let's take a look to statistics.

## 3. Beyond H, the rest of the threshold
The threshold condition is the product between H (constant) and the y-dependent term on the box:
$$\sqrt{\phi_u^2(x,y)+\phi_v^2(x,y)} \geq H \cdot \boxed{\sqrt{\overline{\phi_u^2}(y)+\overline{\phi_v^2}(y)}}$$
Comparing $\sqrt{\overline{\phi_u^2}(y)+\overline{\phi_v^2}(y)}$ for the 2D and 3D case we can see a big difference in its evolution up to $y^+\approx 15$:
![SHAP structures analysis-attachment-4.png|500](/img/user/9%20Operational/91%20Assets/SHAP%20structures%20analysis-attachment-4.png)
*Caption: evolution of the y-dependent threshold condition for the 2D case (purple), 3D case with only horizontal and vertical velocity (blue), and 3D case with all velocity components (green). The results are non-dimensionalized with the value at the mid-channel for comparison.*

> [!important] Observation:
> This difference translates into a much larger threshold for the 2D case for the same value of H for $y^+<15$. Thus introducing a bias during segmentation.

> [!Example] Verification
> To verify this, I have run a test case where 3D curve was used for the segmentation of the 2D case. Here are the results:
> ![SHAP structures analysis-attachment-5.png|500](/img/user/9%20Operational/91%20Assets/SHAP%20structures%20analysis-attachment-5.png) 
> *Caption: PDF of the 2D SHAP values using the $\sqrt{\overline{\phi_u^2}(y)+\overline{\phi_v^2}(y)}$ factor obtained from the 2D data (left) and from the 3D data (right). Note that both of them are for the 2D case, just the y-dependent threshold has been adjusted.*
> - The legs up to $y^+=15$ are broader when we use the 3D threshold evolution, this already demonstrates a higher amount of structures being captured in that region. 
> - Additionally, it is important to note that the PDF is adimensionalized with the maximum bin of the histograms conforming it (thus max = 1). Therefore, if the numbers of structures being captured below $y^+$ 15 has substantially increased compared to the higher regions of the domain, the larger bin is now larger, making the number of structures in the $u^+>0, y^+>15$ region insignificant to be represented in the plot (note that the minimum color is not 0).
> 
> This theory is easily proved reducing the minimal value of the colormap range:
> ![SHAP structures analysis-attachment-6.png|500](/img/user/9%20Operational/91%20Assets/SHAP%20structures%20analysis-attachment-6.png)
> *Caption: same as last figure but with reduced minimum for the colormap range.*

This modification of the factor $\sqrt{\overline{\phi_u^2}(y)+\overline{\phi_v^2}(y)}$ is fictional though, it represents something statistically captured by the SHAP values, and an individual analysis shows that $\overline{\phi_u^2}(y)$ is the one introducing such discrepancies (see figure below). So the question to be made is: Why are we having such difference in the evolution of $\sqrt{\overline{\phi_u^2}(y)+\overline{\phi_v^2}(y)}$?

## 4. Identifying the problem
Continue from here