/* eslint-disable */
var img = new Image();
window.phetImages.push( img );
img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABICAYAAAByQzKvAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACqdJREFUeNrsnF1oVOkZx58585X5ypxoKHojIwgiLDouy7I31ShIWaiNBqktrCZKu5SWanIjLX5Esa2yIklZaEUp0asWglbZlJX1Qm9k8UIMdKVeqJ3Fr9rUOn4k8z3T5/9mntk3Z2cmEzV2OHMeeHjPnHlncvI7//O8z/s1RI7Nq7kcBHO3jSe/MrmIa6cSn338TsIB/JrWferv5tSjrwcLk8/6i5kpKhaLyl0eH7V1dA5fGuwesH7GcLA1bvmJe0OeVLI/0ualBQsWUEdHB5mmSeGAn1yTyf6Nv/vbiKPgV7Qf/fHLrvTEw8t+r5fa2trI4/FQPp+veKFQoFKpRN72joG/7F437Ch4jmZkJntDgQBFIhFqb2+naDSqHMc4Fw6HVdnmKg7+5MRlUz7ncdDNbh/87NO4USpuCgSDFGQPh0Lk83kpm8tTLpejbDarSiiYzSyVcn1cDjuAG7Dv7/tzn2EYQ21+nxloC1CI4UZDAQr63JTKeSiV9VKaw4UGmKiQ2S2Amy4G79q1K86Pnnn48OEr8/U3Lly4EOvu7k7Uq9M3fMnkDGHE7XZvikYjlEplVDgwI2HqjPgo5GfA2SJNZgo0xZ5iwGKlAsOe+MfS3/7ih4mmUvDOnTtLaDygkmPHjn2jCL1VdrmqvtZL3eUcq1CV+G4vN1THjx+vfMedyAeH5G8x1FVcxLh+PMAxNxoJUcBr0NeP/sNhAWA9FGnzUJgBe4xCRaH4U99crZcyvgDy5OYCDACxWIxWrFih/hnYixcvVIx7E7Z48WIFF1kAUiyxF486BhFPAdkwXOT3MsA2H7UHvRTiUJDOZenBhId8fPMDPkPBjQQ86npxX4rs+KyuByPUDsDnmwowGpAlS5ZQPB4nv99P586do2fPntGaNWtU3vm6NjExQcuXL1dp1fPnzyvnV3r9lFeUiNwM2Ocx2F3kdRvq+J//SqknAK/9rOYAQwd47mNQvlCiLHuuYJD+vBWMJswioAhRGPzx48e0fft2GhsbU2Be1xBDcePwd/BkiC0MR4i5KrgedrebQwpCjMBCb82F8wycPVCGnOObksnzufz0zdBDWrYcnpoKMLqd6XSaXr58qVplwB4ZGVEqvnfv3mt//8qVK1UIQqfg+vXrlfNPFwUJOAHWW4boZQWj9PC5VE5CQEmFg4IKC3xcLE2XSvylGQouNWMenEql6OHDh3Tz5k0Vg5ctW0Znzpx5YzEYoef27duExuvq1avqKYE9W7q4HH8N1UPD+SDX8fM1eD1uVm9RvY8wks0XOXsoMHyXyiLSuSLnw+z50gwFA37TAYZ6Hzx4oC4U/yjK9evX1wwnjWYS4ngS7ty5QwsXLqSTJ09WvuDDX79/WamzWIyVMwj193EjkHWEOO91u72UyxcYaEGlZgghk5m8gg3IGXZdw8n/Pr7SdIC58dnBCh5KJpOmNR2rB7MeVKtjcIbDT1L/zs+PfLROf/3dX54A6D6+jt38JJmdnQuos/M7rNQcQ/XSi3ReoUT+O1n2VK5QUXAhl0Yxrq7r4MGDpWaC/PTpU3ry5Mn8jy0YRoIbvIFTp06dr1Xn3Z3H4wxthNUcf/e99yjIoaM9EuFG0U/BckdjihWcyuYpo4WxQnZq/JNt769WgI8ePdo0gKVf/zaN4a0eHBwcr/X+ih//BgM3QytXr+5bEI2qQZ1wKMiZhIfSHDIy2W+NRXAoSe/4w0/XnFaAT5w40TSAkTXUCg3z2LCOcygY2Lt3b92u+UefXhly57P9wfKAD64V+TTAiqvGzeVK/Onna5dWbiBiUrPYokWLKi372zJuVOPcuF4+cuTIFQY2sH///qpqLoQ6fp/5971+pHgAax0PhqO/7AqGZ8xquC5evNg0CkYeXG38YT5tcnKSWMEqg4Hz4z68b9++gWp1f/DJF0P08mk/Oitut1vl0wIcpTe6cPj8nu/NBHzt2rWmauTelKHXJp0DHYQ81oibcEDNZDKqRB4O5+Nxrr/uwIEDSev3fnjki4Ol9MvdpXzWzKen5+XcoWjSGzYPff6rDcPfynpu3bplS8CIkZVelfTCGIYOWMCiFLjwqakplEmut65WA7jx5FcqZ8bxZx+/UzN+u+7evWtLwNbGUiBLKAJoAayrF3A1rwu5oetIJBK2Byxg9VIUDSVb1Yu4jBJjIlwmGPJq7i8kXykNRLfQzoABUj+W11JKgwW3sig3ujH2v/LLda90Hffv3y/ZHXA19VodIQMKhnrhUC9cjvm9Q9zoHZzzdXAeaEvAUJ8+RlEPsqSHgCyhQeBi3BjHXCIeo9eXmFOIwF2zoyFTkLk4PP7oGKCs1lNEHUCWETRJ6+DSS+NYbfLrQa6+Y04KvnHjhi0VrHpWbBJfAQ9jzEjfJIXT1SvHcGQXZdXOcEwzMeilc1GxR5+bspNBfaJgwAVUKBGQ0R1HKe/r4QSv8R4aP+mMSM6M83zj5qRi19jYWMmugAFLAAOOgANghAKZnxMV6yWgimqlFOcb1dFo2mZbBUsahvAg6tUX6YliBbKeeaDUb4qEFXH+nk1c7XRDgPXZVbsBlgYOkAAYcIvlGWJrAyhg5caoaXoLWDjq8nvdDQO2q4L1+CvqFeXqoQPQAFlP6aQe3tddbgbX6Wq4kbOrgvXwALiiXF21omyUMsmqg5abIHC1Hp/JMTjOPt6yChYYgCdZgoCVmKzH5bIyZyhYbpIoXj8uj6SNt6yCRXmSromay6nWjM4E3Kp+XcXVnKY3wZxvWQXLEixZjmWFKp0KcV21+qyKDrrays1ZAY+Ojtpyn0ZPT09J4qrVreMROszZpqw0uOhwzDr44+zRmGdzADuAHcCOOYAdwA5gxxzADmAHsGMOYAewY60B+G2vlK9lbruB3bp1a9+qVatuYJk/Zo5lih6TmzKvJgtQ5CbI2mHMJMtwJlZcYqwcW79QYpUPFumgDoY3MXy5YcOG2KVLly7UvdF2A7xt27bLDLMLcNWPZ5R/iQTl9J63kDovpe7lCU3lWAchy1j1pVSy8lJmp/kmLe3t7U3Uuh7b/SAHqwu/8zBjVbu+UUVbCqXUrJeoL9NC+qIT62f1wXuanjpqHcAMIF5rk6J1paW1nszj4bV11bu28r0SKvSZ6pZq5KyzFNZj69SPTAfpZbUpIuuPfDTSmNpKwVu2bDGtE5X6dLvMKuvT8Na1D/I5mWmutjYCrs3jxVoGMMON64AlnlYDVG1BSS3A+vJXcS3ctA5gti55jAVuNfXWgltPwVbIGuC1rRSD1+qx1ArXGi6qnbeqvNpnLPW7Tp8+bdoecE9PT0wUXK/xqddgWevM9lrzTa2g4L5Ggc6lTj3QFYiG0Wt7wBwLexsdo6iWutWrN9uPgzDgrrNnz8ZsC5jDA7KHWL21ZHpnQ9+ToS+n0n9J1XpcbYmVJc5vsnMWYVbrMJS7zpXdQuidSU9N37ssuz31DYnSk5Odn9pG8cqAT1m9Aty0M+CErkjAtEIWiACGkTVx2SYAtwKWPcz4jD42IYqGYRyj/EQkbT2atnnz5j4GOsSATGuaJWuCq+23kG0BkgOLwkXxolq5eXpYAViM2nV2dg7v2bNnoCWGK7u7u+MSMvSGqlpHQ85ZF1fDBbCEBH18Q3aFAvbo6OgVcuz/Z/8TYAAAWR3gpZUTDAAAAABJRU5ErkJggg==';
export default img;
