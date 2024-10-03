import Link from "next/link";
import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";

export const RingSizeChart = ({ setRingSize }) => {
  useEffect(() => {
    function handleClickOutside(event) {
      const popupContent = document.querySelector(".main-ring-size-chart");
      if (popupContent && !popupContent.contains(event.target)) {
        setRingSize(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setRingSize]);

  const handleClickInside = (event) => {
    // Prevent the click event from propagating to the outer elements
    event.stopPropagation();
  };
  return (
    <div class="main-ring-size-chart" onClick={handleClickInside}>
      <div className="popup-custom">
        <div className="inner-popup-ring-size">
          <span className="cross">
            <Link onClick={() => setRingSize(false)} href="javascript:void(0);">
              <IoMdClose />
            </Link>
          </span>
          <div class="main-top-sect-right-chart">
            <h3 className="center">Ring Size Chart</h3>
            <p>
              All of our rings are crafted in standard US sizes. View the chart
              below to see how US sizes map to finger circumference and convert
              to international sizes. Engagement rings, wedding bands, and
              fashion rings all follow the same size format.
            </p>
          </div>

          <div class="table-ring-chart">
            <table class="responsive tw-mx-auto tw-w-full">
              <tbody>
                <tr>
                  <th colspan="2">Inside Circumference</th>
                  <th rowspan="2">US Size</th>
                </tr>
                <tr>
                  <th>IN</th>
                  <th>MM</th>
                </tr>
                <tr>
                  <td>1.74</td>
                  <td>44.2</td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>1.77</td>
                  <td>44.8</td>
                  <td>3.25</td>
                </tr>
                <tr>
                  <td>1.79</td>
                  <td>45.5</td>
                  <td>3.5</td>
                </tr>
                <tr>
                  <td>1.82</td>
                  <td>46.1</td>
                  <td>3.75</td>
                </tr>
                <tr>
                  <td>1.84</td>
                  <td>46.8</td>
                  <td>4</td>
                </tr>
                <tr>
                  <td>1.87</td>
                  <td>47.4</td>
                  <td>4.25</td>
                </tr>

                <tr>
                  <td>1.89</td>
                  <td>48</td>
                  <td>4.5</td>
                </tr>
                <tr>
                  <td>1.92</td>
                  <td>48.7</td>
                  <td>4.75</td>
                </tr>
                <tr>
                  <td>1.94</td>
                  <td>49.3</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>1.97</td>
                  <td>50</td>
                  <td>5.25</td>
                </tr>
                <tr>
                  <td>1.99</td>
                  <td>50.6</td>
                  <td>5.5</td>
                </tr>
                <tr>
                  <td>2.02</td>
                  <td>51.2</td>
                  <td>5.75</td>
                </tr>
                <tr>
                  <td>2.04</td>
                  <td>51.9</td>
                  <td>6</td>
                </tr>
                <tr>
                  <td>2.07</td>
                  <td>52.5</td>
                  <td>6.25</td>
                </tr>
                <tr>
                  <td>2.09</td>
                  <td>53.1</td>
                  <td>6.5</td>
                </tr>
                <tr>
                  <td>2.12</td>
                  <td>53.8</td>
                  <td>6.75</td>
                </tr>

                <tr>
                  <td>2.14</td>
                  <td>54.4</td>
                  <td>7</td>
                </tr>
                <tr>
                  <td>
                    2.17
                    <br />
                  </td>
                  <td>55.1</td>
                  <td>7.25</td>
                </tr>
                <tr>
                  <td>
                    2.19
                    <br />
                  </td>
                  <td>55.7</td>
                  <td>7.5</td>
                </tr>
                <tr>
                  <td>
                    2.22
                    <br />
                  </td>
                  <td>56.3</td>
                  <td>7.75</td>
                </tr>
                <tr>
                  <td>
                    2.24
                    <br />
                  </td>
                  <td>57</td>
                  <td>8</td>
                </tr>
                <tr>
                  <td>2.27</td>
                  <td>57.6</td>
                  <td>8.25</td>
                </tr>
                <tr>
                  <td>2.29</td>
                  <td>58.3</td>
                  <td>8.5</td>
                </tr>
                <tr>
                  <td>2.32</td>
                  <td>58.9</td>
                  <td>8.75</td>
                </tr>
                <tr>
                  <td>2.34</td>
                  <td>59.5</td>
                  <td>9</td>
                </tr>
                <tr>
                  <td>2.37</td>
                  <td>60.2</td>
                  <td>9.25</td>
                </tr>
                <tr>
                  <td>2.39</td>
                  <td>60.8</td>
                  <td>9.5</td>
                </tr>
                <tr>
                  <td>2.42</td>
                  <td>61.4</td>
                  <td>9.75</td>
                </tr>
                <tr>
                  <td>2.44</td>
                  <td>62.1</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>2.47</td>
                  <td>62.7</td>
                  <td>10.25</td>
                </tr>
                <tr>
                  <td>2.49</td>
                  <td>63.4</td>
                  <td>10.5</td>
                </tr>
                <tr>
                  <td>2.52</td>
                  <td>64</td>
                  <td>10.75</td>
                </tr>
                <tr>
                  <td>2.54</td>
                  <td>64.6</td>
                  <td>11</td>
                </tr>
                <tr>
                  <td>2.57</td>
                  <td>65.3</td>
                  <td>11.25</td>
                </tr>
                <tr>
                  <td>2.59</td>
                  <td>65.9</td>
                  <td>11.5</td>
                </tr>
                <tr>
                  <td>2.62</td>
                  <td>66.6</td>
                  <td>11.75</td>
                </tr>
                <tr>
                  <td>2.65</td>
                  <td>67.2</td>
                  <td>12</td>
                </tr>
                <tr>
                  <td>2.68</td>
                  <td>68.1</td>
                  <td>12.25</td>
                </tr>
                <tr>
                  <td>2.71</td>
                  <td>68.5</td>
                  <td>12.5</td>
                </tr>
                <tr>
                  <td>2.72</td>
                  <td>69.1</td>
                  <td>12.75</td>
                </tr>
                <tr>
                  <td>2.75</td>
                  <td>69.7</td>
                  <td>13</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
