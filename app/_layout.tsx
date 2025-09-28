import { useFrameworkReady } from '@/hooks/useFrameworkReady'@@ .. @@
         />
         <Tabs.Screen
-          name="+not-found"
-          options={{
-            href: null,
-          }}
-        />
-        <Tabs.Screen
           name="edit/[id]"
           options={{
             href: null,
           }}
         />
         <Tabs.Screen
           name="data/categories"
           options={{
             href: null,
           }}
         />
       </Tabs>
       <StatusBar style="dark" backgroundColor="#ffffff" />
     </TransactionsProvider>
   );
 }