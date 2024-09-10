
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
                  <th colspan="2">
                    <span class="pinned-table-header">
                      Inside Circumference
                    </span>
                  </th>
                  <th rowspan="2">US, Canada, Mexico</th>
                  <th rowspan="2">
                    <span class="large-table-header">
                      UK, Australia, Ireland, New Zealand, South Africa
                    </span>
                  </th>
                  <th rowspan="2">France</th>
                  <th rowspan="2">
                    <span class="medium-table-header">
                      Germany, Russia, Ukraine, Asia
                    </span>
                  </th>
                  <th rowspan="2">
                    <span class="large-table-header">
                      India, China, Japan, South America, Turkey, Israel
                    </span>
                  </th>
                  <th rowspan="2">
                    <span class="large-table-header">
                      Italy, Spain, Netherlands, Switzerland
                    </span>
                  </th>
                </tr>
                <tr>
                  <th style={{ with: "88px" }}>IN</th>
                  <th style={{ with: "88px" }}>MM</th>
                </tr>
                <tr>
                  <td>1.74</td>
                  <td>44.2</td>
                  <td>3</td>
                  <td>F</td>
                  <td>44</td>
                  <td>14</td>
                  <td>4</td>
                  <td>4</td>
                </tr>
                <tr>
                  <td>1.77</td>
                  <td>44.8</td>
                  <td>3.25</td>
                  <td>F 1/2</td>
                  <td>44.625</td>
                  <td>14.25</td>
                  <td>---</td>
                  <td>4.625</td>
                </tr>
                <tr>
                  <td>1.79</td>
                  <td>45.5</td>
                  <td>3.5</td>
                  <td>G</td>
                  <td>45.25</td>
                  <td>14.5</td>
                  <td>5</td>
                  <td>5.25</td>
                </tr>
                <tr>
                  <td>1.82</td>
                  <td>46.1</td>
                  <td>3.75</td>
                  <td>G 1/2</td>
                  <td>45.875</td>
                  <td>14.75</td>
                  <td>6</td>
                  <td>5.875</td>
                </tr>
                <tr>
                  <td>1.84</td>
                  <td>46.8</td>
                  <td>4</td>
                  <td>H</td>
                  <td>46.5</td>
                  <td>15</td>
                  <td>7</td>
                  <td>6.5</td>
                </tr>
                <tr>
                  <td>1.87</td>
                  <td>47.4</td>
                  <td>4.25</td>
                  <td>H 1/2</td>
                  <td>47.125</td>
                  <td>15.25</td>
                  <td>---</td>
                  <td>7.125</td>
                </tr>
                <tr>
                  <td>1.89</td>
                  <td>48</td>
                  <td>4.5</td>
                  <td>I</td>
                  <td>47.75</td>
                  <td>15.5</td>
                  <td>8</td>
                  <td>7.75</td>
                </tr>
                <tr>
                  <td>1.92</td>
                  <td>48.7</td>
                  <td>4.75</td>
                  <td>J</td>
                  <td>48.375</td>
                  <td>---</td>
                  <td>---</td>
                  <td>8.375</td>
                </tr>
                <tr>
                  <td>1.94</td>
                  <td>49.3</td>
                  <td>5</td>
                  <td>J 1/2</td>
                  <td>49</td>
                  <td>15.75</td>
                  <td>9</td>
                  <td>9</td>
                </tr>
                <tr>
                  <td>1.97</td>
                  <td>50</td>
                  <td>5.25</td>
                  <td>K</td>
                  <td>49.625</td>
                  <td>16</td>
                  <td>---</td>
                  <td>9.625</td>
                </tr>
                <tr>
                  <td>1.99</td>
                  <td>50.6</td>
                  <td>5.5</td>
                  <td>K 1/2</td>
                  <td>50.25</td>
                  <td>16.25</td>
                  <td>10</td>
                  <td>10.25</td>
                </tr>
                <tr>
                  <td>2.02</td>
                  <td>51.2</td>
                  <td>5.75</td>
                  <td>L</td>
                  <td>50.875</td>
                  <td>---</td>
                  <td>11</td>
                  <td>10.875</td>
                </tr>
                <tr>
                  <td>2.04</td>
                  <td>51.9</td>
                  <td>6</td>
                  <td>L 1/2</td>
                  <td>51.5</td>
                  <td>16.5</td>
                  <td>12</td>
                  <td>11.5</td>
                </tr>
                <tr>
                  <td>2.07</td>
                  <td>52.5</td>
                  <td>6.25</td>
                  <td>M</td>
                  <td>52.125</td>
                  <td>16.75</td>
                  <td>---</td>
                  <td>12.125</td>
                </tr>
                <tr>
                  <td>2.09</td>
                  <td>53.1</td>
                  <td>6.5</td>
                  <td>M 1/2</td>
                  <td>52.75</td>
                  <td>17</td>
                  <td>13</td>
                  <td>12.75</td>
                </tr>
                <tr>
                  <td>2.12</td>
                  <td>53.8</td>
                  <td>6.75</td>
                  <td>N</td>
                  <td>53.375</td>
                  <td>---</td>
                  <td>---</td>
                  <td>13.375</td>
                </tr>
                <tr>
                  <td>2.14</td>
                  <td>54.4</td>
                  <td>7</td>
                  <td>N 1/2</td>
                  <td>54</td>
                  <td>17.25</td>
                  <td>14</td>
                  <td>14</td>
                </tr>
                <tr>
                  <td>2.17</td>
                  <td>55.1</td>
                  <td>7.25</td>
                  <td>O</td>
                  <td>54.625</td>
                  <td>17.5</td>
                  <td>---</td>
                  <td>14.625</td>
                </tr>
                <tr>
                  <td>2.19</td>
                  <td>55.7</td>
                  <td>7.5</td>
                  <td>O 1/2</td>
                  <td>55.25</td>
                  <td>17.75</td>
                  <td>15</td>
                  <td>15.25</td>
                </tr>
                <tr>
                  <td>2.22</td>
                  <td>56.3</td>
                  <td>7.75</td>
                  <td>P</td>
                  <td>55.875</td>
                  <td>---</td>
                  <td>---</td>
                  <td>15.875</td>
                </tr>
                <tr>
                  <td>2.24</td>
                  <td>57</td>
                  <td>8</td>
                  <td>P 1/2</td>
                  <td>56.5</td>
                  <td>18</td>
                  <td>16</td>
                  <td>16.5</td>
                </tr>
                <tr>
                  <td>2.27</td>
                  <td>57.6</td>
                  <td>8.25</td>
                  <td>Q</td>
                  <td>57.125</td>
                  <td>18.25</td>
                  <td>---</td>
                  <td>7.125</td>
                </tr>
                <tr>
                  <td>2.29</td>
                  <td>58.3</td>
                  <td>8.5</td>
                  <td>Q 1/2</td>
                  <td>57.75</td>
                  <td>18.5</td>
                  <td>17</td>
                  <td>17.75</td>
                </tr>
                <tr>
                  <td>2.32</td>
                  <td>58.9</td>
                  <td>8.75</td>
                  <td>R</td>
                  <td>58.375</td>
                  <td>18.75</td>
                  <td>---</td>
                  <td>18.375</td>
                </tr>
                <tr>
                  <td>2.34</td>
                  <td>59.5</td>
                  <td>9</td>
                  <td>R 1/2</td>
                  <td>59</td>
                  <td>19</td>
                  <td>18</td>
                  <td>19</td>
                </tr>
                <tr>
                  <td>2.37</td>
                  <td>60.2</td>
                  <td>9.25</td>
                  <td>S</td>
                  <td>59.625</td>
                  <td>19.25</td>
                  <td>---</td>
                  <td>19.625</td>
                </tr>
                <tr>
                  <td>2.39</td>
                  <td>60.8</td>
                  <td>9.5</td>
                  <td>S 1/2</td>
                  <td>60.25</td>
                  <td>19.5</td>
                  <td>19</td>
                  <td>20.25</td>
                </tr>
                <tr>
                  <td>2.42</td>
                  <td>61.4</td>
                  <td>9.75</td>
                  <td>T</td>
                  <td>60.875</td>
                  <td>19.75</td>
                  <td>---</td>
                  <td>20.875</td>
                </tr>
                <tr>
                  <td>2.44</td>
                  <td>62.1</td>
                  <td>10</td>
                  <td>T 1/2</td>
                  <td>61.5</td>
                  <td>20</td>
                  <td>20</td>
                  <td>21.25</td>
                </tr>
                <tr>
                  <td>2.47</td>
                  <td>62.7</td>
                  <td>10.25</td>
                  <td>U</td>
                  <td>62.125</td>
                  <td>20.25</td>
                  <td>21</td>
                  <td>22.125</td>
                </tr>
                <tr>
                  <td>2.49</td>
                  <td>63.4</td>
                  <td>10.5</td>
                  <td>U 1/2</td>
                  <td>62.75</td>
                  <td>20.5</td>
                  <td>22</td>
                  <td>22.75</td>
                </tr>
                <tr>
                  <td>2.52</td>
                  <td>64</td>
                  <td>10.75</td>
                  <td>V</td>
                  <td>63.375</td>
                  <td>---</td>
                  <td>---</td>
                  <td>23.375</td>
                </tr>
                <tr>
                  <td>2.54</td>
                  <td>64.6</td>
                  <td>11</td>
                  <td>V 1/2</td>
                  <td>64</td>
                  <td>20.75</td>
                  <td>23</td>
                  <td>24</td>
                </tr>
                <tr>
                  <td>2.57</td>
                  <td>65.3</td>
                  <td>11.25</td>
                  <td>W</td>
                  <td>64.625</td>
                  <td>---</td>
                  <td>---</td>
                  <td>24.625</td>
                </tr>
                <tr>
                  <td>2.59</td>
                  <td>65.9</td>
                  <td>11.5</td>
                  <td>W 1/2</td>
                  <td>65.25</td>
                  <td>21</td>
                  <td>24</td>
                  <td>25.25</td>
                </tr>
                <tr>
                  <td>2.62</td>
                  <td>66.6</td>
                  <td>11.75</td>
                  <td>X</td>
                  <td>65.875</td>
                  <td>---</td>
                  <td>---</td>
                  <td>25.875</td>
                </tr>
                <tr>
                  <td>2.65</td>
                  <td>67.2</td>
                  <td>12</td>
                  <td>X 1/2</td>
                  <td>66.5</td>
                  <td>21.25</td>
                  <td>25</td>
                  <td>26.5</td>
                </tr>
                <tr>
                  <td>2.68</td>
                  <td>68.1</td>
                  <td>12.25</td>
                  <td>Y</td>
                  <td>67.125</td>
                  <td>21.5</td>
                  <td>---</td>
                  <td>27.125</td>
                </tr>
                <tr>
                  <td>2.71</td>
                  <td>68.5</td>
                  <td>12.5</td>
                  <td>Z</td>
                  <td>67.75</td>
                  <td>21.75</td>
                  <td>26</td>
                  <td>27.75</td>
                </tr>
                <tr>
                  <td>2.72</td>
                  <td>69.1</td>
                  <td>12.75</td>
                  <td>Z 1/2</td>
                  <td>68.375</td>
                  <td>---</td>
                  <td>---</td>
                  <td>28.375</td>
                </tr>
                <tr>
                  <td>2.75</td>
                  <td>69.7</td>
                  <td>13</td>
                  <td>---</td>
                  <td>69</td>
                  <td>22</td>
                  <td>27</td>
                  <td>29</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
  );
};
