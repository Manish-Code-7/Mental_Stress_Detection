"use client";
import { NavBar } from "@/components/NavBar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function AwarenessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <NavBar />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Stress Management Guide</h1>
          <p className="text-gray-600 text-lg">
            Learn how to manage and reduce your stress effectively
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-8 border-l-4 border-purple-600">
          <p className="text-gray-700 leading-relaxed">
            Everyone experiences stress – it's a normal feeling. In moderation, it can be a helpful 
            indicator that you feel under threat or uncomfortable and a sign to take steps to reduce this. 
            A little stress can be a good thing, as it helps us to get things done or focus on something 
            that needs our attention. However, if you feel stressed most of the time, or if stress is 
            affecting how you live your life day-to-day, this becomes a problem.
          </p>
        </div>

        <Tabs defaultValue="understanding" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="understanding">Understanding</TabsTrigger>
            <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
            <TabsTrigger value="causes">Causes</TabsTrigger>
            <TabsTrigger value="management">Management</TabsTrigger>
          </TabsList>

          <TabsContent value="understanding" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>What is Stress?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Stress is the feeling of pressure you could get when you have a heavy workload at work, 
                  or have just had an argument with a loved one. It could be the feeling that keeps you up 
                  at night when you're worried about money.
                </p>
                <p className="text-gray-700">
                  However, stress doesn't always come about because of negative events. It can also happen 
                  when something positive or exciting happens to you, like starting a new job, getting married, 
                  or going on holiday.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg mt-4">
                  <h3 className="font-semibold text-blue-900 mb-2">The Good and Bad of Stress</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="font-semibold text-green-700 mb-1">✓ Positive Stress</div>
                      <p className="text-sm text-gray-700">
                        Short-lived stress can make us more alert and help us perform better in certain situations.
                      </p>
                    </div>
                    <div>
                      <div className="font-semibold text-red-700 mb-1">✗ Negative Stress</div>
                      <p className="text-sm text-gray-700">
                        Excessive or prolonged stress can increase the risk of illnesses such as heart disease 
                        and mental health problems such as anxiety and depression.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How Stress Affects Your Body</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  During situations that make you feel threatened or upset, your body creates a stress response. 
                  This can cause a range of physical symptoms, change how you behave, and trigger intense feelings, 
                  such as anger or fear.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-semibold text-red-900 mb-2">Physical Symptoms</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Headaches</li>
                      <li>• Muscle tension</li>
                      <li>• Stomach upset</li>
                      <li>• Racing heartbeat</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Mental Symptoms</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Difficulty concentrating</li>
                      <li>• Forgetfulness</li>
                      <li>• Feeling overwhelmed</li>
                      <li>• Constant worry</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Behavioral Symptoms</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Irritability</li>
                      <li>• Sleep changes</li>
                      <li>• Changes to eating habits</li>
                      <li>• Craving unhealthy habits</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                  <p className="text-sm text-gray-700">
                    <strong>The Fight or Flight Response:</strong> These symptoms are triggered by a rush of 
                    stress hormones (adrenaline, noradrenaline, and cortisol) in your body. Once the pressure 
                    or threat has passed, your stress hormone levels usually return to normal. However, if you 
                    always feel stressed, these hormones stay in your body, increasing the likelihood of chronic stress symptoms.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="symptoms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Identifying the Signs of Stress</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  We all feel stress at times. However, if stress creeps into all aspects of your life, health 
                  and wellbeing, it's important to tackle it as soon as possible. While stress affects everyone 
                  differently, there are common signs and symptoms to look out for:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="p-3 bg-gray-50 rounded">Constant worry or anxiety</div>
                    <div className="p-3 bg-gray-50 rounded">Feeling overwhelmed</div>
                    <div className="p-3 bg-gray-50 rounded">Difficulty concentrating</div>
                    <div className="p-3 bg-gray-50 rounded">Mood swings or changes in temperament</div>
                    <div className="p-3 bg-gray-50 rounded">A short temper or irritability</div>
                    <div className="p-3 bg-gray-50 rounded">Difficulty relaxing</div>
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 bg-gray-50 rounded">Frequently feeling down or depressed</div>
                    <div className="p-3 bg-gray-50 rounded">Low self-esteem</div>
                    <div className="p-3 bg-gray-50 rounded">Eating more or less than usual</div>
                    <div className="p-3 bg-gray-50 rounded">Changes in sleep habits</div>
                    <div className="p-3 bg-gray-50 rounded">Using alcohol, tobacco, or illegal drugs to cope</div>
                    <div className="p-3 bg-gray-50 rounded">Aches and pains, particularly muscle tension</div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
                  <p className="text-sm text-red-800">
                    <strong>Important:</strong> If you experience these symptoms often, or for long periods of time, 
                    and feel they are affecting your everyday life or making you feel unwell, speak to your GP. 
                    Ask them for information about the support services and treatments available to you.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="causes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>What Causes Stress?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">
                  Many different situations can cause stress. The most common involve work, money, and our relationships. 
                  Our health and the health of our loved ones also affect our stress levels.
                </p>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="relationships">
                    <AccordionTrigger className="font-semibold">Relationships</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700">
                        Relationships can be a great support in times of stress. However, from time to time, 
                        the people close to you, be it a partner, parent, child, friend or colleague can increase 
                        your stress levels. Events such as ongoing minor arguments and disagreements to larger 
                        family difficulties, such as an affair, illness or bereavement are likely to affect the 
                        way you think, feel and behave.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="work">
                    <AccordionTrigger className="font-semibold">Work-Life Balance</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 mb-2">
                        The pressure of continually working harder and for longer hours is one of our biggest 
                        causes of stress. Not having control over your job, not receiving rewards for hard work 
                        and worrying about losing your job, can also increase the risk of work-related stress.
                      </p>
                      <p className="text-gray-700">
                        Unfortunately, work-related stress doesn't tend to go away on its own. We need to take 
                        steps to manage this stress, or it can quickly get on top of us, putting us at risk of 
                        burnout or more severe mental health problems like anxiety or depression.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="money">
                    <AccordionTrigger className="font-semibold">Money & Financial Stress</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 mb-2">
                        Money and debt concerns place huge pressure on us, so it comes as no surprise that they 
                        have a big effect on our stress levels. The cost of living, energy and food prices, rent 
                        costs, and mortgage rates can leave many people struggling to keep their heads above water.
                      </p>
                      <p className="text-gray-700">
                        Unfortunately, 50% of people living with some form of debt also struggle with their mental 
                        health. If you're worried about your finances and debts, or you noticed a dip in your mental 
                        health due to money worries, it's important that you don't deal with this alone. There's a 
                        lot of help and support available through organizations such as StepChange and Citizens Advice.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="substances">
                    <AccordionTrigger className="font-semibold">Smoking, Drinking & Drug Use</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 mb-2">
                        When we're feeling stressed, we may smoke, drink alcohol, or try recreational drugs as forms 
                        of self-medication to help us cope. However, despite the common belief that smoking relieves 
                        stress, nicotine is an addictive substance that triggers withdrawal symptoms and cravings that 
                        actually increase the risk of stress, anxiety and depression.
                      </p>
                      <p className="text-gray-700">
                        Similarly, alcohol can potentially worsen our mental health long term by increasing anxiety and 
                        depression. Illegal drugs might seem like a quick fix when you're having a hard time, but they 
                        can make you feel worse and increase the risk of becoming dependent, which can make you more 
                        susceptible to severe mental health conditions.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="management" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>How to Manage Your Stress</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">
                  Stress is a natural reaction to worrying, as well as difficult, or new or even exciting life events. 
                  But if you feel stressed most of the time, or your stress is affecting your life or health, it's worth 
                  taking steps to reduce this.
                </p>

                <div className="space-y-6">
                  <div className="p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-blue-500">
                    <h3 className="font-semibold text-lg mb-2">1. Understand When Stress is Causing You a Problem</h3>
                    <p className="text-gray-700 text-sm mb-2">
                      Try to connect your feelings or physical signs with the pressures you're facing in your life. 
                      Remember to look out for the physical warnings, such as tense muscles, over-tiredness, headaches 
                      or migraines, as well as emotional signs like irritability and forgetfulness.
                    </p>
                  </div>

                  <div className="p-5 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-l-4 border-green-500">
                    <h3 className="font-semibold text-lg mb-2">2. Identify the Causes of Your Stress</h3>
                    <p className="text-gray-700 text-sm mb-2">
                      Stress can be caused by one big issue or a build-up of many small ones. To stop you from feeling 
                      overwhelmed, once you notice feelings of stress in your body or mind, pause for a moment. What 
                      happened right before you noticed these feelings? Tracking your physical and mental sensations of 
                      stress over a couple of days or weeks can help you pinpoint where they're coming from.
                    </p>
                  </div>

                  <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-l-4 border-purple-500">
                    <h3 className="font-semibold text-lg mb-2">3. Focus on What You Can Change</h3>
                    <p className="text-gray-700 text-sm mb-2">
                      You may not be able to change everything, but there will be stresses in your life that you can manage. 
                      Take a couple of moments to list everything you can think about which is causing you to worry. Which 
                      of the items on your list are not in your control? Once you have identified these, it's good to 
                      practise reminding yourself that you're wasting important energy on things that will probably resolve 
                      themselves over time.
                    </p>
                  </div>

                  <div className="p-5 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-l-4 border-yellow-500">
                    <h3 className="font-semibold text-lg mb-2">4. Start Small</h3>
                    <p className="text-gray-700 text-sm mb-2">
                      Using the items that you can control from your list, number them in order of most manageable to least. 
                      Then focus on tackling the most manageable tasks first. Once you begin ticking off the more achievable 
                      tasks, you'll likely start to feel an increase in confidence and motivation and a reduction in stress levels.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lifestyle Strategies for Stress Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="text-2xl mb-2">😴</div>
                    <h4 className="font-semibold mb-2">Get Restful Sleep</h4>
                    <p className="text-sm text-gray-600">
                      Sleeping problems are common when you're struggling with stress. Try to make sure you get enough rest.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="text-2xl mb-2">🏃</div>
                    <h4 className="font-semibold mb-2">Move Your Body Regularly</h4>
                    <p className="text-sm text-gray-600">
                      Physical activity can be very effective in relieving stress. Even going out for a 10-minute brisk 
                      walk or a bike ride can help.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="text-2xl mb-2">🥗</div>
                    <h4 className="font-semibold mb-2">Keep a Healthy Diet</h4>
                    <p className="text-sm text-gray-600">
                      Certain foods can improve mood, balance hormones, and boost energy levels. Aim to drink plenty of 
                      water and eat a mineral and vitamin-rich diet.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="text-2xl mb-2">📅</div>
                    <h4 className="font-semibold mb-2">Maintain a Routine</h4>
                    <p className="text-sm text-gray-600">
                      When elements of our lives seem unmanageable, routines can give us a sense of control. Sticking to 
                      a daily pattern of sleeping, eating, and exercising can help.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="text-2xl mb-2">💆</div>
                    <h4 className="font-semibold mb-2">Practise Regular Self-Care</h4>
                    <p className="text-sm text-gray-600">
                      Striking a balance between responsibilities to others and to yourself is key. Self-care can mean 
                      something different to everyone – choose activities that are most meaningful to you.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="text-2xl mb-2">🧘</div>
                    <h4 className="font-semibold mb-2">Be Mindful</h4>
                    <p className="text-sm text-gray-600">
                      Mindfulness meditation is a simple tool that can be practised anywhere, at any time, to reduce stress. 
                      Research has suggested that mindfulness can reduce the effects of stress-related problems.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                    <h4 className="font-semibold mb-2">Be Aware of Your Smoking and Drinking</h4>
                    <p className="text-sm text-gray-700">
                      Although alcohol and nicotine may reduce tension in the short term, alcohol is a depressant and 
                      nicotine creates cravings, both of which can increase the risk of more stress in the long term.
                    </p>
                  </div>

                  <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-500">
                    <h4 className="font-semibold mb-2">Be Kind to Yourself</h4>
                    <p className="text-sm text-gray-700">
                      When you're struggling with stress, it's easy to get into a negative headspace, thinking hurtful 
                      things about yourself. In these moments, try to remind yourself that you're not at fault. Stress 
                      has an intense effect on all of us, and it's okay to be kind to yourself.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50">
          <CardHeader>
            <CardTitle>Remember</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              If you're experiencing persistent stress that's affecting your daily life, don't hesitate to seek 
              professional help. Speak to your GP or a mental health professional who can provide guidance and support 
              tailored to your specific situation.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
